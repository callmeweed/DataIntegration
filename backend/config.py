from pydantic import BaseSettings
from typing import Union, List, Optional
import json

class Settings(BaseSettings):
    """
    Settings for the smart parking
    """
    list_webpage = [
                    "batdongsanvn",
                    "houseviet",
                    "bds123vn",
                    "muabannet"
                    ]
    port:int=8000
    host:str="0.0.0.0"
    redis_ip ="172.17.0.1"
    celery_broker: str = "redis://"+str(redis_ip)+":6379"
    celery_backend: str = "redis://"+str(redis_ip)+":6379"
    celery_result_expires: int = 20