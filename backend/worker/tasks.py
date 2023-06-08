from .get_celery import get_celery
from config import Settings
import sys
sys.path.append("..")


settings = Settings()
application = get_celery()

@application.task(bind=True)
def run_session(self, session_id):
    print("test session")
    return "run_session"