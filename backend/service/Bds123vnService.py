from .Base import BaseService
from model.request import RequestSearch
from model.response import Response
import asyncio
from fastapi import HTTPException
from unidecode import unidecode
import re
import logging

class Bds123vnService(BaseService):
    def __init__(self, ):
        super(Bds123vnService, self).__init__()

    def rewriteQuery(self,req:RequestSearch)-> str:
        url = None
        _type = ""
        city = ""
        if req.type == "Bán":
            _type = "nha-dat-ban"
        elif req.type == "Thuê":
            _type = "nha-dat-cho-thue"

        if req.city == "Hà Nội":
            city = "ha-noi"
        elif req.city == "Hồ Chí Minh":
            city = "ho-chi-minh"
        #https://bds123.vn/nha-dat-ban-ha-noi.html
        if req.district == "All":
            url = f"https://bds123.vn/{_type}-{city}.html"
        else:
            district = str(req.district).lower().strip()
            normalized_district = unidecode(district).strip().replace(" ", "-")
            url = f"https://bds123.vn/{_type}-{normalized_district}.html"

        #Từ 30 - 50m2
        #https://bds123.vn/nha-dat-ban-quan-bac-tu-liem.html?dien_tich_tu=30&dien_tich_den=50
        if req.area != "All":
            from_area = ""
            to_area = ""
            area = str(req.area).lower().strip()
            area = re.sub(r'[^0-9]+', ' ', area).strip().split()
            #[30, 50, 2]
            if len(area) == 2:
                if str(area[0]) == "30":
                    to_area = "30"
                    url = f"{url}?dien_tich_den={to_area}"
                elif str(area[0]) == "500":
                    from_area = "500"
                    url = f"{url}?dien_tich_tu={from_area}"

            elif len(area) == 3:
                from_area = area[0]
                to_area = area[1]
                url = f"{url}?dien_tich_tu={from_area}&dien_tich_den={to_area}"
        else:
            pass

        if req.page > 1 and url != None:
            url += "&page=" + str(req.page)
        print("url", url)
        return url

    def parser_html(self, soup):

        results = []
        try:
            # print(type(soup))
            list_records = soup.find('ul', 'post-listing')
            # logging.debug("list_records" + str(list_records))
            # logging.debug("list_records" + type(list_records))
            records = list_records.find_all('li')
            for record in records:
                title = record.find("a")

                link = "https://bds123.vn" + str(title.get("href"))
                thumbnail = title.find("img").get("data-src")
                title = title.get("title")

                date = record.find("span", class_='time').get("title")



                area = record.find("div", class_='info-features').find("span")
                area = re.sub(r"<.*?>", "", str(area))

                price = record.find("span", class_='price')
                price = re.sub(r"<.*?>", "", str(price))
                # print(date)

                result = Response(title=title, link=link, date=date, thumbnail=thumbnail, area=area, price=price, source="bds123vn").dict()
                results.append(result)
            return results
        except Exception as e:
            print(e)
            return results

    async def process(self, req: RequestSearch):
        results = []
        while True:
            url = self.rewriteQuery(req)
            if url == None:
                return results

            soup = await self.asyncDoQuery(url)
            if soup == None:
                raise HTTPException(404, "Not found, try again later")

            condition = soup.select('div.listing-empty')
            if condition != []:
                return results

            if req.page == 5:
                return results

            result = self.parser_html(soup)
            for i in result:
                results.append(i)

            req.page += 1
        return results