from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, relationship
from extensions import db
from faker import Faker  # Import Faker
import random

fake = Faker()

class Flight(db.Model, SerializerMixin):
    __tablename__ = 'flights'
    id = db.Column(db.Integer, primary_key=True)
    flight_number = db.Column(db.String(100), unique=True, nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    # Removed users relationship

    @validates('flight_number', 'origin', 'destination', 'departure_time')
    def validate_flight(self, key, value):
        if not value:
            raise ValueError(f"Flight must have a {key}.")
        return value


class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)  # Ensure this column exists
    details = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = relationship('User', back_populates='trips')
    flight = relationship('Flight')  # Add this relationship

    @validates('user_id', 'created_at')
    def validate_trip(self, key, value):
        if not value:
            raise ValueError(f"Trip must have a {key}.")
        return value


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    trips = relationship('Trip', back_populates='user')
def seed_users(n=10):
    """Seed the database with fake users."""
    for _ in range(n):
        user = User(
            username=fake.user_name(),
            password=fake.password(length=12)  # Assume you hash this password before saving
        )
        db.session.add(user)
    db.session.commit()

def seed_flights(n=20):
    """Seed the database with fake flights."""
    for _ in range(n):
        flight = Flight(
            flight_number=fake.bothify(text='???###'),
            origin=fake.city(),
            destination=fake.city(),
            departure_time=fake.date_time_this_year(before_now=True, after_now=False, tzinfo=None)
        )
        db.session.add(flight)
    db.session.commit()

def seed_trips(n=30):
    """Seed the database with fake trips."""
    user_ids = [user.id for user in User.query.all()]
    flight_ids = [flight.id for flight in Flight.query.all()]
    
    for _ in range(n):
        trip = Trip(
            user_id=random.choice(user_ids),
            flight_id=random.choice(flight_ids),
            details=fake.text(max_nb_chars=200),
            created_at=fake.date_time_this_year(before_now=True, after_now=False, tzinfo=None)
        )
        db.session.add(trip)
    db.session.commit()

def seed_all():
    """Seed all tables with fake data."""
    seed_users()
    seed_flights()
    seed_trips()