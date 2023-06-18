from .Base import BaseService
from model.request import RequestSearch
from model.response import Response
import asyncio
from fastapi import HTTPException
from unidecode import unidecode
import re
import logging

class BatdongsanvnService(BaseService):
    def __init__(self, ):
        super(BatdongsanvnService, self).__init__()

    def rewriteQuery(self,req:RequestSearch)-> str:
        url = None
        _type = ""
        city = ""
        district_HCM = ["quận 1", "quận 2", "quận 3", "quận 4", "quận 5", "quận 6", "quận 7", "quận 8", "quận 9", "quận 10", "quận 11", "quận 12"]
        if req.type == "Bán":
            _type = "ban-nha-dat"
        elif req.type == "Thuê":
            _type = "cho-thue-nha-dat"

        if req.city == "Hà Nội":
            city = "ha-noi"
        elif req.city == "Hồ Chí Minh":
            city = "ho-chi-minh"

        if req.district == "All":
            url = f"https://batdongsan.vn/{_type}-{city}"
        else:
            district = str(req.district).lower().strip()
            if district not in district_HCM:
                district = district.replace("huyện ", "").replace("quận ", "").strip()
            normalized_district = unidecode(district).strip().replace(" ", "-")
            url = f"https://batdongsan.vn/{_type}-{normalized_district}-{city}"

        if req.area != "All":
            area = str(req.area).lower().strip()
            normalized_area = unidecode(area).strip()
            normalized_area = re.sub(r'[^a-zA-Z0-9]+', '-', normalized_area.lower())
            url = f"{url}-{normalized_area}"
            # Từ 80 - 100m2
            #-tu-30-50-m2

        if req.page > 1 and url != None:
            url += "/p" + str(req.page)
        print("url", url)
        return url

    def parser_html(self, soup):

        results = []
        try:
            # print(type(soup))
            list_records = soup.find('div', 'uk-grid uk-grid-small uk-grid-width-1-1')
            records = list_records.find_all('div', 'item')
            for record in records:
                title = record.find("div", class_='name').find("a")

                link = title.get("href")
                title = title.contents[0]

                date = record.find("div", class_='meta footer').find("span").find("time")
                date = date.contents[0]

                thumbnail = record.find("div", class_='image cover').find("a").find("img")
                thumbnail = thumbnail.get("src")

                area = record.find("span", class_='acreage')
                if area is not None:
                    area = area.contents[0]


                price = record.find("span", class_='price')
                price = price.contents[0]
                price = re.sub(r'[\n\t]', '', price)
                # print(date)

                result = Response(title=title, link=link, date=date, thumbnail=thumbnail, area=area, price=price, source="batdongsanvn").dict()
                results.append(result)
            return results
        except Exception as e:
            print(e)
            return results

    async def process(self, req: RequestSearch):
        results = []
        # if req.text is None or req.text == "":
        while True:
            url = self.rewriteQuery(req)
            if url == None:
                return results

            soup = await self.asyncDoQuery(url)
            if soup == None:
                raise HTTPException(404, "Not found, try again later")

            condition = soup.select('div.uk-panel > p')
            if condition != []:
                return results
            if req.page == 5:
                return results

            result = self.parser_html(soup)
            for i in result:
                results.append(i)

            req.page += 1
        return results

            # url = self.rewriteQuery(req)
            # if url == None:
            #     return results
            # soup = await self.asyncDoQuery(url)
            # if soup == None:
            #     raise HTTPException(404, "Not found, try again later")
            # results = self.parser_html(soup)
            # return results
        # else:
        #     candidates = []
        #     page = req.page
        #     list_soup = []
        #     for i in range((page - 1) * 5, page * 5):
        #         if i == 0: continue
        #         req.page = i
        #         url = self.rewriteQuery(req)
        #         if url == None:
        #             continue
        #         fut = self.asyncDoQuery(url)
        #         list_soup.append(fut)
        #     temps = await asyncio.gather(*list_soup)
        #
        #     for temp in temps:
        #
        #         if temp == None:
        #             continue
        #         else:
        #             candidates.append(temp)
        #     for x in candidates:
        #         # print(type(x))
        #         results += self.parser_html(x)
        #     # candidates = [ for x in candidates]
        #     results = self.filterQuery(req.text, results)
        #
        #     return results