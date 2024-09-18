import os
class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('MYSQL_URI','mysql+pymysql://root:password@mysql:3306/inventory_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False