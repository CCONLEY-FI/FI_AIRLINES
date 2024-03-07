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
    departure_date = db.Column(db.Date, nullable=False)
    departure_time = db.Column(db.Time, nullable=False)
    arrival_date = db.Column(db.Date, nullable=False)
    arrival_time = db.Column(db.Time, nullable=False)

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

    user = relationship('User', back_populates='trips')
    flight = relationship('Flight')
