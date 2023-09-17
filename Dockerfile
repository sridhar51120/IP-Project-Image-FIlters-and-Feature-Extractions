FROM python:3.8-slim-buster

RUN apt-get update && apt-get install -y libgl1-mesa-glx

ENV FLASK_APP=/app/app.py

ENV FLASK_RUN_HOST=0.0.0.0

RUN pip install --upgrade pip

WORKDIR /app

COPY /htdocs/ /app/

COPY requirements.txt requirements.txt 

RUN pip install -r requirements.txt  

CMD ["python", "app.py"]

