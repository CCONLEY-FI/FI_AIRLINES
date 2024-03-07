from extensions import db
from app import app
from models import Flight, Trip, User
from datetime import datetime, timedelta
from faker import Faker
import random
from flask_bcrypt import Bcrypt


fake = Faker()
bcrypt = Bcrypt()


def seed_users(n=10):  # Number of users to create
    known_password = "password"  # You may choose a different known password
    hashed_password = bcrypt.generate_password_hash(
        known_password).decode('utf-8')

    for _ in range(n):
        username = fake.user_name()
        user = User(username=username, password=hashed_password)
        db.session.add(user)
    db.session.commit()

    print(f"Seeded {n} users with the known password: {known_password}")
    

def seed_flights(n=50):
    flights = []
    existing_flight_numbers = {
        flight.flight_number for flight in Flight.query.all()}

    while len(flights) < n:
        flight_number = fake.bothify(text='FL###')

        if flight_number in existing_flight_numbers:
            continue

        origin = fake.city()
        destination = fake.city()
        departure_datetime = fake.date_time_this_year(
            before_now=False, after_now=True)
        arrival_datetime = departure_datetime + \
            timedelta(hours=random.randint(1, 5))

        flight = Flight(
            flight_number=flight_number,
            origin=origin,
            destination=destination,
            departure_date=departure_datetime.date(),
            departure_time=departure_datetime.time(),
            arrival_date=arrival_datetime.date(),
            arrival_time=arrival_datetime.time()
        )
        flights.append(flight)
        existing_flight_numbers.add(flight_number)

    db.session.add_all(flights)
    db.session.commit()
    return flights

def seed_trips(flights, user_ids):
    trips = []
    for flight in flights:
        user_id = random.choice(user_ids)
        trip = Trip(user_id=user_id, flight_id=flight.id)
        trips.append(trip)
    db.session.add_all(trips)
    db.session.commit()

def seed_data():
    # Assuming you do not want to delete existing flights and trips
    # Fetch existing user IDs to associate trips with users
    user_ids = [user.id for user in User.query.all()]
    
    if not user_ids:
        print("No users found. Seeding users...")
        seed_users(n=10)
        user_ids = [user.id for user in User.query.all()]

    # Seed flights
    flights = seed_flights(n=50)  # Adjust the number of flights as needed

    # Seed trips with the newly created flights and existing users
    seed_trips(flights, user_ids)

    print("Database seeded with flights and trips!")

if __name__ == "__main__":
    with app.app_context():
        seed_data()
