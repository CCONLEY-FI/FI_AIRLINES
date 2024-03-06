import os
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_migrate import Migrate
from extensions import db  # Import db from extensions.py
from flask_bcrypt import Bcrypt
import logging
import requests
from requests.exceptions import RequestException
# Ensure models are imported after db to avoid uninitialized db usage
from models import Flight, Trip, User
from dotenv import load_dotenv
from flask.views import MethodView

load_dotenv()  # Take environment variables from .env.

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', "sqlite:///flights.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

bcrypt = Bcrypt(app)
db.init_app(app)
migrate = Migrate(app, db)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

logging.basicConfig(level=logging.DEBUG)

class FlightAPI(MethodView):
    def get(self):
        access_key = os.getenv('AVIATIONSTACK_API_KEY')  # Get API key from environment variable
        if not access_key:
            return jsonify({'error': 'API key is not set'}), 500

        base_url = 'https://api.aviationstack.com/v1/flights'
        params = {
            'access_key': access_key,
            # Add any other parameters you need
        }

        try:
            response = requests.get(base_url, params=params)
            # Check for HTTP codes other than 200
            if response.status_code != 200:
                # You can be more specific with each status code if needed
                return jsonify({'error': 'Failed to fetch data from aviationstack API', 'status_code': response.status_code}), response.status_code
            data = response.json()
            return jsonify(data)
        except RequestException as e:
            # Handle connection errors, timeouts, etc.
            return jsonify({'error': 'API request failed', 'details': str(e)}), 503

class RealTimeFlightAPI(MethodView):
    def get(self, flight_number):
        access_key = os.getenv('AVIATIONSTACK_API_KEY')
        if not access_key:
            return jsonify({'error': 'API key is not set'}), 500

        params = {
            'access_key': access_key,
            'flight_number': flight_number
        }
        response = requests.get('https://api.aviationstack.com/v1/flights', params=params)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch flight data'}), response.status_code

class AirlineInfoAPI(MethodView):
    def get(self, iata_code):
        access_key = os.getenv('AVIATIONSTACK_API_KEY')
        params = {
            'access_key': access_key,
            'airline_iata': iata_code
        }
        response = requests.get('https://api.aviationstack.com/v1/airlines', params=params)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch airline information'}), response.status_code

class AirportInfoAPI(MethodView):
    def get(self, iata_code):
        access_key = os.getenv('AVIATIONSTACK_API_KEY')
        params = {
            'access_key': access_key,
            'iata_code': iata_code
        }
        response = requests.get('https://api.aviationstack.com/v1/airports', params=params)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch airport information'}), response.status_code

class FlightCRUD(MethodView):
    def post(self):
        data = request.get_json()
        flight = Flight(**data)
        db.session.add(flight)
        db.session.commit()
        return jsonify(flight.to_dict()), 201

    def get(self, id=None):
        if id is None:
            flights = Flight.query.all()
            return jsonify([flight.to_dict() for flight in flights])
        else:
            flight = Flight.query.get_or_404(id)
            return jsonify(flight.to_dict())

    def put(self, id):
        flight = Flight.query.get_or_404(id)
        data = request.get_json()
        for key, value in data.items():
            setattr(flight, key, value)
        db.session.commit()
        return jsonify(flight.to_dict())

    def delete(self, id):
        flight = Flight.query.get_or_404(id)
        db.session.delete(flight)
        db.session.commit()
        return jsonify({}), 204

class TripCRUD(MethodView):
    def post(self):
        data = request.get_json()
        trip = Trip(**data)
        db.session.add(trip)
        db.session.commit()
        return jsonify(trip.to_dict()), 201

    def get(self, id=None):
        if id is None:
            trips = Trip.query.all()
            return jsonify([trip.to_dict() for trip in trips])
        else:
            trip = Trip.query.get_or_404(id)
            return jsonify(trip.to_dict())

    def put(self, id):
        trip = Trip.query.get_or_404(id)
        data = request.get_json()
        for key, value in data.items():
            setattr(trip, key, value)
        db.session.commit()
        return jsonify(trip.to_dict())

    def delete(self, id):
        trip = Trip.query.get_or_404(id)
        db.session.delete(trip)
        db.session.commit()
        return jsonify({}), 204

class UserCRUD(MethodView):
    def post(self):
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

    def get(self, id=None):
        if id is None:
            users = User.query.all()
            return jsonify([user.to_dict() for user in users])
        else:
            user = User.query.get_or_404(id)
            return jsonify(user.to_dict())

    def put(self, id):
        user = User.query.get_or_404(id)
        data = request.get_json()
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return jsonify(user.to_dict())

    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({}), 204

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

# Registering the views
app.add_url_rule('/api/flights', view_func=FlightAPI.as_view('flight_api'))
app.add_url_rule('/api/real-time-flight/<flight_number>', view_func=RealTimeFlightAPI.as_view('real_time_flight_api'))
app.add_url_rule('/api/airline/<iata_code>', view_func=AirlineInfoAPI.as_view('airline_info_api'))
app.add_url_rule('/api/airport/<iata_code>', view_func=AirportInfoAPI.as_view('airport_info_api'))
app.add_url_rule('/flights', defaults={'id': None}, view_func=FlightCRUD.as_view('flights_list'), methods=['GET',])
app.add_url_rule('/flights', view_func=FlightCRUD.as_view('create_flight'), methods=['POST',])
app.add_url_rule('/flights/<int:id>', view_func=FlightCRUD.as_view('flight_detail'), methods=['GET', 'PUT', 'DELETE'])
app.add_url_rule('/trips', defaults={'id': None}, view_func=TripCRUD.as_view('trips_list'), methods=['GET',])
app.add_url_rule('/trips', view_func=TripCRUD.as_view('create_trip'), methods=['POST',])
app.add_url_rule('/trips/<int:id>', view_func=TripCRUD.as_view('trip_detail'), methods=['GET', 'PUT', 'DELETE'])
app.add_url_rule('/users', defaults={'id': None}, view_func=UserCRUD.as_view('users_list'), methods=['GET',])
app.add_url_rule('/users', view_func=UserCRUD.as_view('create_user'), methods=['POST',])
app.add_url_rule('/users/<int:id>', view_func=UserCRUD.as_view('user_detail'), methods=['GET', 'PUT', 'DELETE'])

if __name__ == "__main__":
    app.run(debug=True)
