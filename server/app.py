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

from models import *  # Adjust this line if necessary to fit your project structure
load_dotenv()  # Take environment variables from .env.



class Flights(Resource):
  
  def get(self):
      flights_list = [i.to_dict() for i in Flight.query.all()]
      response = make_response(
        flights_list,
        200
      )
      return response
api.add_resource(Flights, '/flights')

class Users(Resource):
  def get(self):
    user_list = [i.to_dict() for i in User.query.all()]
    response = make_response(
      user_list,
      200
    )
    return response
api.add_resource(Users, '/users')

class Trips(Resource):
  def get(self):
    trip_list = [i.to_dict() for i in Trip.query.all()]
    return trip_list, 200
api.add_resource(Trips, '/trips')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        # Assuming you have a method in your User model called `safe_data` that excludes sensitive info
        return jsonify({'user': user.safe_data()})
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/users', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    # Validate input data
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Check for existing user
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201
@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

if __name__ == "__main__":
    app.run(debug=True)
