FROM python:3.8-slim

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY /htdocs/ /app/

COPY requirements.txt requirements.txt

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 80

ENV NAME Flask_project

CMD ["python", "app.py"]