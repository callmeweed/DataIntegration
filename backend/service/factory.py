from .BatdongsanvnService import BatdongsanvnService
from .HousevietService import HousevietService
import sys

sys.path.append("..")

FACTORY = {
            "batdongsanvn": BatdongsanvnService,
            "houseviet": HousevietService
           }
