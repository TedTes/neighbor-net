from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from src.config import Config

db = SQLAlchemy()


def create_app():
  try:
    app = Flask(__name__)
    app.config.from_object(Config)
    result = db.init_app(app)
    print(f'inventory_db connection status: {result}')
    from src.routes import inventory_blueprint
    app.register_blueprint(inventory_blueprint)
    return app
  except Exception as e :
     print(e)