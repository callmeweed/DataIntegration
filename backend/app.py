from fastapi import FastAPI
import uvicorn
from config import Settings
from worker import tasks

app = FastAPI()
settings = Settings()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.get("/run_session/{session_id}")
async def run_session(session_id):
    result = tasks.run_session(session_id)
    return result


if __name__ == "__main__":
    uvicorn.run(app, host=settings.host, port=settings.port)
