from extensions import db
from datetime import datetime
from sqlalchemy.orm import relationship

trip_flight_association_table = db.Table(
    'trip_flight',
    db.Column('trip_id', db.Integer, db.ForeignKey(
        'trips.id'), primary_key=True),
    db.Column('flight_id', db.Integer, db.ForeignKey(
        'flights.id'), primary_key=True)
)


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
    trips = db.relationship(
        'Trip', secondary=trip_flight_association_table, back_populates='flights')

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
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    details = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    trip_notes = db.Column(db.String(255), nullable=True)
    user = relationship('User', back_populates='trips')
    flights = db.relationship(
        'Flight', secondary=trip_flight_association_table, back_populates='trips')
    
    def to_dict(self):
        flight_details = [
            {'id': flight.id, 'flight_number': flight.flight_number} for flight in self.flights]
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "details": self.details,
            "created_at": self.created_at.isoformat(),
            "trip_notes": self.trip_notes,
            "flights": flight_details
        }
