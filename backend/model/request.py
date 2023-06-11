from pydantic import BaseModel
from typing import Optional
from enum import Enum


class Type(str, Enum):
    Sell = "Sell"  # Bán
    Lease = "Lease"  # Cho thuê


class City(str, Enum):
    Hanoi = "Hanoi"  # Hà Nội
    HCM = "HCM"  # Hồ Chí Minh


class Area(str, Enum):
    Under30 = "Under30"  # Dưới 30m2
    From30To50 = "From30To50"  # Từ 30m2 đến 50m2
    From50To80 = "From50To80"  # Từ 50m2 đến 80m2
    From80To100 = "From80To100"  # Từ 80m2 đến 150m2
    From100To150 = "From150To150"  # Từ 100m2 đến 150m2
    Over150 = "Over150"  # Trên 150m2


class RequestSearch(BaseModel):
    """
    Request for search
    """
    type: Optional[Type] = None  # Bán hoặc cho thuê
    city: Optional[City] = None  # Thành phố
    district: Optional[str] = None  # Quận, huyện theo thành phố
    area: Optional[Area] = None  # Diện tích
    text: Optional[str] = None  # Từ khóa tìm kiếm
    page: int = 1  # Trang hiện tại
