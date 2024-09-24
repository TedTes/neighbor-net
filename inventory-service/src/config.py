import os
from dotenv import load_dotenv

load_dotenv()

username = os.getenv('MYSQL_USER', 'root')
password = os.getenv('MYSQL_PASSWORD', 'password')
host = os.getenv('MYSQL_HOST', 'mysql')
port = os.getenv('MYSQL_PORT', '3306')  
dbname = os.getenv('MYSQL_DB_NAME', 'inventory_db') 

class Config:
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{username}:{password}@{host}:{port}/{dbname}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False