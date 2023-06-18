import time

from .Base import BaseService
from model.request import RequestSearch
from model.response import Response
import asyncio
from fastapi import HTTPException
from unidecode import unidecode
import re
import logging

class MuabannetService(BaseService):
    def __init__(self, ):
        super(MuabannetService, self).__init__()

    def rewriteQuery(self,req:RequestSearch)-> str:
        url = None
        _type = ""
        city = ""

        if req.type == "Bán":
            _type = "ban-nha-dat-chung-cu"
        elif req.type == "Thuê":
            _type = "cho-thue-nha-dat"

        if req.city == "Hà Nội":
            city = "ha-noi"
        elif req.city == "Hồ Chí Minh":
            city = "ho-chi-minh"

        if req.district == "All":
            url = f"https://muaban.net/bat-dong-san/{_type}-{city}"
        else:
            district = str(req.district).lower().strip()
            normalized_district = unidecode(district).strip().replace(" ", "-")
            url = f"https://muaban.net/bat-dong-san/{_type}-{normalized_district}-{city}"

        if req.area != "All":
            from_area = ""
            to_area = ""
            area = str(req.area).lower().strip()
            area = re.sub(r'[^0-9]+', ' ', area).strip().split()
            # [30, 50, 2]
            #https://muaban.net/bat-dong-san/ban-nha-dat-chung-cu-huyen-soc-son-ha-noi?area=500-1000000
            if len(area) == 2:
                if str(area[0]) == "30":
                    to_area = "30"
                    url = f"{url}?area=0-{to_area}"
                elif str(area[0]) == "500":
                    from_area = "500"
                    url = f"{url}?area={from_area}-1000000"

            elif len(area) == 3:
                from_area = area[0]
                to_area = area[1]
                url = f"{url}?area={from_area}-{to_area}"
        else:
            pass

        if req.page > 1 and url != None:
            url += "#page=" + str(req.page)
        print("url", url)
        return url

    def parser_html(self, soup):

        results = []
        try:
            # print(type(soup))
            # list_records = soup.find('div', class_="sc-q9qagu-4 enWxAW")
            records = soup.select('.sc-q9qagu-5.jEDOLs')
            for record in records:
                title = record.find("a", class_="title")

                link = "https://muaban.net" + str(title.get("href"))
                title = title.find("span").contents[0]

                # print(title)
                # print(link)

                date = record.select_one(".sc-q9qagu-14.eOzaio > ul > li ")
                date = re.sub(r"<.*?>", "", str(date))
                # print(date)

                thumbnail = record.find("div", "sc-q9qagu-7 kqqkWq").find("img").get("data-src")
                if thumbnail is None:
                    thumbnail = record.find("div", "sc-q9qagu-7 kqqkWq").find("img").get("src")
                # print(thumbnail)

                area = record.select_one(".sc-q9qagu-8.dGTvSk > ul > li")
                area = re.sub(r"<.*?>", "", str(area))
                area = area.replace("-", "").strip()
                # print(area)

                price = record.find("span", class_='price').contents[0]
                # price = re.sub(r"<.*?>", "", str(price))
                # print(price)

                result = Response(title=title, link=link, date=date, thumbnail=thumbnail, area=area, price=price, source="muabannet").dict()
                results.append(result)
            return results
        except Exception as e:
            print(e)
            return results

    async def process(self, req: RequestSearch):
        results = []
        req.page = 3

        url = self.rewriteQuery(req)
        if url == None:
            return results

        soup = await self.asyncDoQuery(url)
        print(soup)
            # time.sleep(2)
        if soup == None:
            raise HTTPException(404, "Not found, try again later")

        results = self.parser_html(soup)

        return results