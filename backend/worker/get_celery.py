import time
import sys
sys.path.append("..")

from celery import Celery
from config import Settings


__celery = None


def get_celery() -> Celery:
    global __celery
    if __celery is None:
        settings = Settings()

        __celery = Celery('jobs',
                          broker=settings.celery_broker,
                          backend=settings.celery_backend,
                          result_expires=settings.celery_result_expires,
                          )
    return __celery

def a_get_result(result, poll_interval=0.1):
    while True:
        return result.get()
        time.sleep(poll_interval)