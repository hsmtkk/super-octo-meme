FROM python:3.11
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY sample.py /app/sample.py
CMD chainlit run sample.py --host 0.0.0.0 --port 80
EXPOSE 80
