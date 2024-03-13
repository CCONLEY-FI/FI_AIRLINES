from extensions import db
from app import app
from models import Flight, Trip, User
from datetime import timedelta, datetime
from faker import Faker
import random
from flask_bcrypt import Bcrypt

fake = Faker()
bcrypt = Bcrypt(app)


def seed_users(n=10):
    """Seeds the database with users."""
    for _ in range(n):
        username = fake.user_name()
        # Ensuring uniqueness by appending a number sequence
        while User.query.filter_by(username=username).first() is not None:
            username = f"{username}{random.randint(1, 999)}"
        hashed_password = bcrypt.generate_password_hash(
            "password").decode("utf-8")
        user = User(username=username, password=hashed_password)
        db.session.add(user)
    db.session.commit()
    print(f"Added {n} users to the database.")


def seed_flights(n=50):
    for _ in range(n):
        unique = False
        while not unique:
            flight_number = fake.bothify(text='FL###')
            if Flight.query.filter_by(flight_number=flight_number).first() is None:
                unique = True

        origin = fake.city()
        destination = fake.city()
        departure_datetime = fake.future_date(end_date="+30d", tzinfo=None)
        arrival_datetime = departure_datetime + \
            timedelta(hours=random.randint(1, 6))

        flight = Flight(
            flight_number=flight_number,
            origin=origin,
            destination=destination,
            departure_date=departure_datetime,
            departure_time=datetime.strptime(fake.time(), '%H:%M:%S').time(),
            arrival_date=arrival_datetime,
            arrival_time=datetime.strptime(fake.time(), '%H:%M:%S').time()
        )
        db.session.add(flight)
    db.session.commit()
    print(f"Added {n} flights to the database.")


def seed_trips(n=20):
    """Seeds the database with trips that associate users with flights."""
    users = User.query.all()
    flights = Flight.query.all()

    for _ in range(n):
        selected_user = random.choice(users)
        selected_flight = random.choice(flights)

        trip_notes = fake.sentence()
        new_trip = Trip(name=fake.word(), user_id=selected_user.id, details="Trip Details",
                        trip_notes=trip_notes, created_at=fake.date_time_this_year(before_now=True, after_now=False))
        new_trip.flights.append(selected_flight)
        db.session.add(new_trip)
    db.session.commit()
    print(f"Added {n} trips to the database.")


def seed_data():
    """Calls the seeding functions to populate the database."""
    print("Starting database seeding...")
    seed_users(10)
    seed_flights(50)
    seed_trips(20)
    print("Database seeding completed.")


if __name__ == "__main__":
    with app.app_context():
        # Option to clear the existing data and create new tables
        db.drop_all()
        db.create_all()
        seed_data()
