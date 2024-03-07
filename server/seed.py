from extensions import db
from app import app
from models import Flight, Trip, User
from datetime import datetime, timedelta
from faker import Faker
import random

fake = Faker()

def seed_flights(n=50):
    flights = []
    for _ in range(n):
        flight_number = fake.bothify(text='FL###')
        origin = fake.city()
        destination = fake.city()
        # Ensure departure is before arrival
        departure_time = fake.date_time_this_year(before_now=False, after_now=True)
        arrival_time = departure_time + timedelta(hours=random.randint(1, 5))
        
        flight = Flight(
            flight_number=flight_number,
            origin=origin,
            destination=destination,
            departure_time=departure_time,
            arrival_time=arrival_time
        )
        flights.append(flight)
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
        print("No users found. Please ensure there are users in the database before seeding trips.")
        return

    # Seed flights
    flights = seed_flights(n=50)  # Adjust the number of flights as needed

    # Seed trips with the newly created flights and existing users
    seed_trips(flights, user_ids)

    print("Database seeded with flights and trips!")

if __name__ == "__main__":
    with app.app_context():
        seed_data()
