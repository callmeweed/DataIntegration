from .get_celery import get_celery
from config import Settings
import sys
import asyncio
from service.factory import FACTORY
from model.request import RequestSearch
import os

sys.path.append("..")

settings = Settings()
application = get_celery()


@application.task(bind=True)
def run_session(self, req: dict, engine: str):
    engine = FACTORY[engine]()
    loop = asyncio.get_event_loop()
    results = loop.run_until_complete(engine.process(RequestSearch(**req)))
    # loop.close()
    return results
