import os
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_migrate import Migrate
from extensions import db  # Import db from extensions.py
from flask_bcrypt import Bcrypt
import logging
import requests
# Ensure models are imported after db to avoid uninitialized db usage
from models import Flight, Trip, User
from dotenv import load_dotenv

load_dotenv()  # Take environment variables from .env.

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///flights.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

bcrypt = Bcrypt(app)
db.init_app(app)
migrate = Migrate(app, db)

CORS(app)

logging.basicConfig(level=logging.DEBUG)

@app.route('/api/flights', methods=['GET'])
def get_flights():
    access_key = os.getenv('AVIATIONSTACK_API_KEY')  # Get API key from environment variable
    if not access_key:
        return jsonify({'error': 'API key is not set'}), 500

    base_url = 'https://api.aviationstack.com/v1/flights'
    params = {
        'access_key': access_key,
        # Add any other parameters you need
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch data from aviationstack API'}), response.status_code


@app.route('/flights', methods=['POST'])
def create_flight():
    data = request.get_json()
    flight = Flight(**data)
    db.session.add(flight)
    db.session.commit()
    return jsonify(flight.to_dict()), 201


@app.route('/flights/<int:id>', methods=['GET'])
def get_flight(id):
    flight = Flight.query.get_or_404(id)
    return jsonify(flight.to_dict())


@app.route('/flights/<int:id>', methods=['PUT'])
def update_flight(id):
    flight = Flight.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(flight, key, value)
    db.session.commit()
    return jsonify(flight.to_dict())


@app.route('/flights/<int:id>', methods=['DELETE'])
def delete_flight(id):
    flight = Flight.query.get_or_404(id)
    db.session.delete(flight)
    db.session.commit()
    return jsonify({}), 204


@app.route('/trips', methods=['GET'])
def get_trips():
    trips = Trip.query.all()
    return jsonify([trip.to_dict() for trip in trips])


@app.route('/trips', methods=['POST'])
def create_trip():
    data = request.get_json()
    trip = Trip(**data)
    db.session.add(trip)
    db.session.commit()
    return jsonify(trip.to_dict()), 201


@app.route('/trips/<int:id>', methods=['GET'])
def get_trip(id):
    trip = Trip.query.get_or_404(id)
    return jsonify(trip.to_dict())


@app.route('/trips/<int:id>', methods=['PUT'])
def update_trip(id):
    trip = Trip.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(trip, key, value)
    db.session.commit()
    return jsonify(trip.to_dict())


@app.route('/trips/<int:id>', methods=['DELETE'])
def delete_trip(id):
    trip = Trip.query.get_or_404(id)
    db.session.delete(trip)
    db.session.commit()
    return jsonify({}), 204


@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if 'username' not in data or 'password' not in data:
        abort(400, description="Missing username or password")
    hashed_password = bcrypt.generate_password_hash(
        data['password']).decode('utf-8')
    data['password'] = hashed_password
    user = User(**data)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201


@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())


@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()
    return jsonify(user.to_dict())


@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({}), 204


@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


if __name__ == "__main__":
    app.run(debug=True)
