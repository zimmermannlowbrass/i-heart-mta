#!/usr/bin/env python3

from flask import request, make_response, jsonify, session
from flask_restful import Resource

from config import app, db, api

from models import db, User, Station, SubwayStop, Trip


@app.route('/')
def index():
    return "Subways are cool"

class Users(Resource):

    def get(self):
        users = User.query.all()
        users_serialized = [user.to_dict() for user in users]
        return make_response(users_serialized, 200)
    
    def post(self):
        data = request.get_json()

        user = User(
            username=data['username'],
            password=data['password']
        )

        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(), 201)

class Users_by_ID(Resource):

    def get(self, id):
        user = User.query.filter(User.id == id).first()
        return make_response(user.to_dict(), 200)
    
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        db.session.delete(user)
        db.session.commit()

        return make_response({"message": "successful deletion of user!"}, 204)

class Login(Resource):

    def get(self):
        response_dict = {
            "message": "Welcome to Logins!"
        }
        reponse = make_response(
            response_dict,
            200
        )
        return reponse
    
    def post(self):

        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter(
            User.username == username
        ).first()

        if user:
            # if user.authenticate(password):

            #     session['user_id'] = user.id

                response = make_response(
                        jsonify(user.to_dict()),
                        200
                    )
                return response
            # return {'error': 'Incorrect password. Double check and try again!'}, 401

        return {'error': 'Unauthorized Email. Double check and try again!'}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204

class Stations(Resource):

    def get(self):
        stations = Station.query.all()
        stations_serialized = [station.to_dict() for station in stations]
        return make_response(stations_serialized, 200)
    
class SubwayStops(Resource):

    def get(self):
        subwaystops = SubwayStop.query.all()
        subwaystops_serialized = [subwaystop.to_dict() for subwaystop in subwaystops]
        return make_response(subwaystops_serialized, 200)
    
class Trips(Resource):

    def get(self):
        trips = Trip.query.all()
        trips_serialized = [trip.to_dict() for trip in trips]
        return make_response(trips_serialized, 200)
    
    def post(self):
        data = request.get_json()
        trip = Trip(
            start_lat=data['start_lat'],
            start_lng=data['start_lng'],
            end_lat=data['end_lat'],
            end_lng=data['end_lng'],
            color=data['color'],
            subwaystops_id=data['subwaystops_id']
        )

        db.session.add(trip)
        db.session.commit()

        return make_response(trip.to_dict(), 201)
    
    def delete(self):
        db.session.query(Trip).delete()
        db.session.commit()

        return make_response({"message": "successful deletion of all trips!"}, 204)
    

api.add_resource(Users, '/users')
api.add_resource(Users_by_ID, '/users/<int:id>')
api.add_resource(Login, '/logins')
api.add_resource(Logout, '/logout')
api.add_resource(Trips, '/trips')
api.add_resource(Stations, '/stations')
api.add_resource(SubwayStops, '/subwaystops')


if __name__ == '__main__':
    app.run(port=5555, debug=True)