from flask import Flask, jsonify, request
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


@app.route('/register', methods=['POST'])
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
