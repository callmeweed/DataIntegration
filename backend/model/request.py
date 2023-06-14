from pydantic import BaseModel
from typing import Optional
from enum import Enum


class Type(str, Enum):
    Sell = "Sell"  # Bán
    Lease = "Lease"  # Cho thuê


class City(str, Enum):
    Hanoi = "Hanoi"  # Hà Nội
    HCM = "HCM"  # Hồ Chí Minh

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
