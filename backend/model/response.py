from typing import Dict, List, Optional
from pydantic import BaseModel
from enum import Enum
class Source(str,Enum):
    batdongsanvn = "batdongsanvn" #https://batdongsan.vn/
    nhatot = "nhatot" #https://www.nhatot.com/
    houseviet = "houseviet" #https://houseviet.vn/
    bds123vn = "bds123vn" #https://bds123.vn/
    muabannet = "muabannet" #https://muaban.net/

class Response(BaseModel):
    title:str
    link:str
    date:Optional[str] = None
    thumbnail:Optional[str] = None #Link ảnh
    area:Optional[str] = None   #diện tích
    price:Optional[str] = None  #giá
    source:Optional[Source] = None
