import os
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import logging
from faker import Faker
import random
from dotenv import load_dotenv
from flask.views import MethodView

load_dotenv()  # Take environment variables from .env.

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', "sqlite:///flights.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

logging.basicConfig(level=logging.DEBUG)
fake = Faker()



# Ensure models are imported after db to avoid uninitialized db usage
from models import Trip, User, Flight  # Adjust this line if necessary to fit your project structure

def generate_fake_flight():
    flight = Flight(
        flight_number=fake.bothify(text='???###'),
        departure_airport=fake.city(),
        arrival_airport=fake.city(),
        departure_time=fake.iso8601(),
        arrival_time=fake.iso8601(),
        status=random.choice(["On Time", "Delayed", "Cancelled"])
    )
    db.session.add(flight)
    db.session.commit()

def populate_db():
    db.drop_all()
    db.create_all()
    for _ in range(10):  # Generate 10 fake flights
        generate_fake_flight()

# Uncomment the next line if you want to repopulate the database every time the app starts
# populate_db()

@app.route('/api/flights')
def get_flights():
    flights = Flight.query.all()
    flights_data = [{
        "flight_number": flight.flight_number,
        "departure_airport": flight.departure_airport,
        "arrival_airport": flight.arrival_airport,
        "departure_time": flight.departure_time,
        "arrival_time": flight.arrival_time,
        "status": flight.status
    } for flight in flights]
    return jsonify(flights_data)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({'user': user.to_dict()})
    else:
        return jsonify({'error': 'Invalid username or password'})
    
@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

if __name__ == "__main__":
    app.run(debug=True)
