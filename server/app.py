from flask import Flask, abort, jsonify, request, session, make_response
from extensions import api, bcrypt, db, app
from models import User, Flight, Trip
from flask_restful import Resource
from datetime import datetime
from flask import session
from models import User
from flask_restful import Resource

# Initialize our Flask application from the extensions module
# Routes are defined using Flask-RESTful for cleaner and more organized code


class Flights(Resource):
    def get(self):
        flights_list = [flight.to_dict() for flight in Flight.query.all()]
        return flights_list, 200

    def post(self):
        data = request.get_json()
        try:
            new_flight = Flight(
                flight_number=data['flight_number'],
                origin=data['origin'],
                destination=data['destination'],
                departure_date=datetime.strptime(
                    data['departure_date'], '%Y-%m-%d').date(),
                departure_time=datetime.strptime(
                    data['departure_time'], '%H:%M:%S').time(),
                arrival_date=datetime.strptime(
                    data['arrival_date'], '%Y-%m-%d').date(),
                arrival_time=datetime.strptime(
                    data['arrival_time'], '%H:%M:%S').time()
            )
            db.session.add(new_flight)
            db.session.commit()
            return new_flight.to_dict(), 201
        except Exception as e:
            print(e)
            return {"error": str(e)}, 500


api.add_resource(Flights, '/flights')


class Users(Resource):
    def get(self):
        user_list = [user.safe_data() for user in User.query.all()]
        return user_list, 200


# Register the Users resource
class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data.get('username')).first()
        if user and bcrypt.check_password_hash(user.password, data.get('password')):
            session['user_id'] = user.id  # Store the user ID in the session
            return {'message': 'Login successful', 'user': user.safe_data()}
        return {'error': 'Invalid credentials'}, 401


api.add_resource(Login, '/login')


class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)  # Remove the user ID from the session
        return {}, 204


api.add_resource(Logout, '/logout')


class TripList(Resource):
    def post(self):
        user_id = session.get('user_id')  # Get the authenticated user's ID
        data = request.get_json()
        flight = Flight.query.get(data.get('flight_id'))
        if not flight:
            return {'message': 'Flight not found'}, 404
        new_trip = Trip(name=data['name'],
                        user_id=user_id, flight_id=flight.id)
        db.session.add(new_trip)
        db.session.commit()
        return new_trip.to_dict(), 201
    
    def get(self):
        # data = request.get_json()
        trips = Trip.query.all()
        return [trip.to_dict() for trip in trips], 200


api.add_resource(TripList, '/trips')


class TripResource(Resource):
    def delete(self, trip_id):
        trip = Trip.query.get(trip_id)
        if not trip:
            abort(404)
        db.session.delete(trip)
        db.session.commit()
        return {'message': 'Trip deleted'}, 200

    def patch(self, trip_id):
        data = request.get_json()
        trip = Trip.query.get(trip_id)
        if not trip:
            abort(404)
        trip.name = data.get('name', trip.name)
        db.session.commit()
        return trip.to_dict(), 200


api.add_resource(TripResource, '/trips/<int:trip_id>')


class AssociateFlightToTrip(Resource):
    def post(self):
        print("Here")
        user_id = session.get('user_id')
        if not user_id:
            return {'message': 'User must be logged in to save flight to trip'}, 401

        data = request.get_json()
        print(data)
        if not data:
            return {'message': 'Flight not found'}, 404

        trip = None
        print(data)
        flight = data.get('flightId')
        sF = Flight.query.filter(Flight.id == flight).first()
        if data.get('tripId'):
            trip = Trip.query.get(data['tripId'])
            print("Trip", trip.user_id)
            if not trip:
                return {'message': 'Trip not found or unauthorized'}, 404
        if data.get('tripName'):
            try:
                print("In Trip Name")
                trip = Trip(name=data['tripName'], user_id=user_id)
                trip.flights.append(sF)  # Linking the flight with the trip
                db.session.add(trip)
                # Flushing to obtain Trip ID if needed for immediate use.
                # db.session.flush()
                db.session.commit()
                print("ADDED!!!!!!")
            except Exception as e:
                db.session.rollback()  # Rolling back in case of an exception
                print(f"Error when creating a new trip: {str(e)}")
                return {'error': 'Failed to create new trip'}, 500
        else:
            print("Here in else")
            return {'message': 'Either tripId or tripName must be provided'}, 400

        # try:
        # except Exception as e:
        #     db.session.rollback()  # Ensure to roll back if there's an error
        #     print(f"Error when saving flight to trip: {str(e)}")
        #     return {'error': 'Failed to save flight to trip'}, 500

        return trip.to_dict(), 201


api.add_resource(AssociateFlightToTrip, '/save-flight-to-trip')


@app.route('/users', methods=['POST'])
def register():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user:
        return {'message': 'User already exists'}, 400
    hashed_password = bcrypt.generate_password_hash(
        data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return {'message': 'User created successfully'}, 201


if __name__ == "__main__":
    app.run(debug=True, port=6000)
