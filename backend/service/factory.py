from .BatdongsanvnService import BatdongsanvnService
from .HousevietService import HousevietService
from .Bds123vnService import Bds123vnService
from .MuabannetService import MuabannetService
import sys

sys.path.append("..")

FACTORY = {
            "batdongsanvn": BatdongsanvnService,
            "houseviet": HousevietService,
            "bds123vn": Bds123vnService,
            "muabannet": MuabannetService
           }
