#!/usr/bin/env python3

from flask import request, make_response, jsonify, session
from flask_restful import Resource

from config import app, db, api

from models import db, User, Station, SubwayStop, Trip


@app.route('/')
def index():
    return "Subways are cool"

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
            end_lng=data['end_lng']
        )

        db.session.add(trip)
        db.session.commit()

        return make_response(trip.to_dict(), 201)
    
api.add_resource(Trips, '/trips')
api.add_resource(Stations, '/stations')
api.add_resource(SubwayStops, '/subwaystops')


if __name__ == '__main__':
    app.run(port=5555, debug=True)