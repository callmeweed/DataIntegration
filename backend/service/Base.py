from email import header
import requests
from bs4 import BeautifulSoup
from model.request import RequestSearch
import http3, string, random
from typing import Dict, List, Optional

class BaseService:
    def __init__(self):
        pass