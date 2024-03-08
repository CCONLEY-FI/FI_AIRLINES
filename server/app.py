from flask import Flask, abort, jsonify, request,session
from extensions import api, bcrypt, db, app
from models import User, Flight, Trip
from flask_restful import Resource

# Initialize our Flask application from the extensions module
# Routes are defined using Flask-RESTful for cleaner and more organized code


class Flights(Resource):
    def get(self):
        flights_list = [flight.to_dict() for flight in Flight.query.all()]
        return flights_list, 200


api.add_resource(Flights, '/flights')


class Users(Resource):
    def get(self):
        user_list = [user.safe_data() for user in User.query.all()]
        return user_list, 200


# Register the Users resource
api.add_resource(Users, '/users')


class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data.get('username')).first()
        if user and bcrypt.check_password_hash(user.password, data.get('password')):
            return jsonify({'message': 'Login successful', 'user': user.safe_data()})
        return {'error': 'Invalid credentials'}, 401


# Register the Login resource
api.add_resource(Login, '/login')
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
api.add_resource(Logout, '/logout')
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict()
        return {}, 401
api.add_resource(CheckSession, '/check_session')

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
        return jsonify(new_trip.to_dict()), 201
api.add_resource(TripList, '/trips')


class TripResource(Resource):
    def delete(self, trip_id):
        trip = Trip.query.get(trip_id)
        if not trip:
            abort(404)
        db.session.delete(trip)
        db.session.commit()
        return jsonify({'message': 'Trip deleted'}), 200

    def patch(self, trip_id):
        data = request.get_json()
        trip = Trip.query.get(trip_id)
        if not trip:
            abort(404)
        trip.name = data.get('name', trip.name)
        db.session.commit()
        return jsonify(trip.to_dict()), 200
api.add_resource(TripResource, '/trips/<int:trip_id>')


class AssociateFlightToTrip(Resource):

    def post(self):
        user_id = session.get('user_id')
        data = request.get_json()
        trip = Trip.query.filter_by(id=data.get(
            'tripId'), user_id=user_id).first()
        flight = Flight.query.get(data.get('flightId'))

        if not trip or not flight:
            return {'message': 'Trip or Flight not found'}, 404

        # Assuming Trip model can directly associate with Flight via flight_id
        trip.flight_id = flight.id
        db.session.commit()

        return jsonify({'message': 'Flight associated with trip successfully'}), 200
api.add_resource(AssociateFlightToTrip, '/save-flight-to-trip')



@app.route('/users', methods=['POST'])
def register():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user:
        return jsonify({'message': 'User already exists'}), 400
    hashed_password = bcrypt.generate_password_hash(
        data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


if __name__ == "__main__":
    app.run(debug=True)
