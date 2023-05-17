FROM python:3
WORKDIR /app

ADD . /app

COPY ./requirements.txt /app/requirements.txt

RUN  pip install -r /app/requirements.txt --verbose

# COPY . /app/

# CMD ["python", "manage.py", "runserver"]
# RUN python /app/manage.py runserver
