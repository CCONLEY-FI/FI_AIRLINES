import os
from flask import Flask, jsonify, request, abort, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import logging
from faker import Faker
import random
from dotenv import load_dotenv
from flask.views import MethodView
from flask_restful import Api, Resource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', "sqlite:///flights.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
api = Api(app)

logging.basicConfig(level=logging.DEBUG)
fake = Faker()

# db.init_app(app)