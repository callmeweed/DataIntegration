FROM python:3.10-buster


WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

ENV C_FORCE_ROOT=1

COPY . /app
CMD uvicorn server:app --host 0.0.0.0