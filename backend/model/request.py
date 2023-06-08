from pydantic import BaseModel
from typing import Optional

class RequestSearch(BaseModel):
    """
    Request for search
    """
    type:Optional[str]=None