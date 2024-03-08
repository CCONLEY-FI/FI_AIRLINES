from extensions import db  # Ensure circular imports are resolved
from datetime import datetime
from sqlalchemy.orm import relationship


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    trips = relationship('Trip', back_populates='user')

    def safe_data(self):
        return {"id": self.id, "username": self.username}


class Flight(db.Model):
    __tablename__ = 'flights'
    id = db.Column(db.Integer, primary_key=True)
    flight_number = db.Column(db.String(100), unique=True, nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    departure_date = db.Column(db.Date)
    departure_time = db.Column(db.Time)
    arrival_date = db.Column(db.Date)
    arrival_time = db.Column(db.Time)

    def to_dict(self):
        return {
            "id": self.id,
            "flight_number": self.flight_number,
            "origin": self.origin,
            "destination": self.destination,
            "departure_date": self.departure_date.isoformat(),
            "departure_time": self.departure_time.isoformat(),
            "arrival_date": self.arrival_date.isoformat(),
            "arrival_time": self.arrival_time.isoformat()
        }


class Trip(db.Model):
    __tablename__ = 'trips'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey(
        'flights.id'), nullable=False)
    details = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    trip_notes = db.Column(db.String(255), nullable=True)

    user = relationship('User', back_populates='trips')
    flight = relationship('Flight')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "flight_id": self.flight_id,
            "details": self.details,
            "created_at": self.created_at.isoformat(),
            "trip_notes": self.trip_notes
        }
