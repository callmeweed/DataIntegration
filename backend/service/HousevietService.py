from .Base import BaseService
from model.request import RequestSearch
from model.response import Response
import asyncio
from fastapi import HTTPException
from unidecode import unidecode
import re
import logging

class HousevietService(BaseService):
    def __init__(self, ):
        super(HousevietService, self).__init__()

    def rewriteQuery(self,req:RequestSearch)-> str:
        url = None
        _type = ""
        city = ""
        district_HCM = ["quận 1", "quận 2", "quận 3", "quận 4", "quận 5", "quận 6", "quận 7", "quận 8", "quận 9",
                        "quận 10", "quận 11", "quận 12"]
        if req.type == "Bán":
            _type = "nha-dat-ban"
        elif req.type == "Thuê":
            _type = "nha-dat-cho-thue"

        if req.city == "Hà Nội":
            city = "ha-noi"
        elif req.city == "Hồ Chí Minh":
            city = "ho-chi-minh"

        if req.district == "All":
            url = f"https://houseviet.vn/{_type}-{city}"
        else:
            district = str(req.district).lower().strip()
            if district not in district_HCM:
                district = district.replace("huyện ", "").replace("quận ", "").strip()
            normalized_district = unidecode(district).strip().replace(" ", "-")
            url = f"https://houseviet.vn/{_type}-{normalized_district}"



        if req.area != "All":
            area = str(req.area).lower().strip()
            normalized_area = unidecode(area).strip()
            #Từ 80 - 100m2 -> từ 80 m2 đến 100m2
            normalized_area = normalized_area.replace("-", "m2 den")
            # print(normalized_area)
            if normalized_area.find("m2"):
                normalized_area = normalized_area.replace("m2", "-m2")
                # print(normalized_area)
            normalized_area = re.sub(r'[^a-zA-Z0-9]+', '-', normalized_area.lower())
            # print(normalized_area)
            url = f"{url}-dien-tich-{normalized_area}"
        else:
            pass

        if req.page > 1 and url != None:
            url += "/p" + str(req.page)
        print("url", url)
        return url

    def parser_html(self, soup):

        results = []
        try:
            # print(type(soup))
            list_records = soup.find('div', 'property')
            records = list_records.find_all('section', 'property-item')
            for record in records:
                title = record.find("div", class_='property-body').find("a")

                link = title.get("href")
                title = title.get("title")

                date = record.find("div", class_='property-time').find("span")
                date = date.get("data-time")
                #2 thumb bai vip
                #//section[@class="property-item"]/.//img[@class="swiper-lazy swiper-lazy-loaded"]
                #13 thumb bai bt
                #//section[@class="property-item"]/.//figure[@class="rounded property-image"]/img/@src

                thumbnail = record.find("img", class_='swiper-lazy swiper-lazy-loaded')
                if thumbnail is not None:
                    thumbnail = thumbnail.get("src")
                else:
                    thumbnail = record.find("figure", class_='rounded property-image').find("img").get("data-src")



                area = record.find("div", class_='property-area')
                if area is not None:
                    area = area.contents[0]


                price = record.find("span", class_='price-text')
                price = price.contents[0]
                price = re.sub(r'[\n\t]', '', price)
                # print(date)

                result = Response(title=title, link=link, date=date, thumbnail=thumbnail, area=area, price=price, source="houseviet").dict()
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

            condition = soup.select('div.empty-content')
            if condition != []:
                return results

            result = self.parser_html(soup)
            for i in result:
                results.append(i)

            req.page += 1
        return results