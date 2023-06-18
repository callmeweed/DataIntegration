from pydantic import BaseModel
from typing import Optional
from enum import Enum


class Type(str, Enum):
    Sell = "Bán"  # Bán
    Lease = "Thuê"  # Cho thuê


class City(str, Enum):
    Hanoi = "Hà Nội"  # Hà Nội
    HCM = "Hồ Chí Minh"  # Hồ Chí Minh

class RequestSearch(BaseModel):
    """
    Request for search
    """
    type: Optional[Type] = None  # Bán hoặc cho thuê
    city: Optional[City] = None  # Thành phố
    district: Optional[str] = None  # Quận, huyện theo thành phố
    area: Optional[str] = None  # Diện tích
    text: Optional[str] = None  # Từ khóa tìm kiếm
    page: int = 1  # Trang hiện tại
