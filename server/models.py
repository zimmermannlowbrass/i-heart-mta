from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    def __repr__(self):
        return f'<User>{self.username}'
    

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    start_lat = db.Column(db.Float)
    start_lng = db.Column(db.Float)
    end_lat = db.Column(db.Float)
    end_lng = db.Column(db.Float)

    start_id = db.Column(db.Integer, db.ForeignKey('subwaystops.id'))
    end_id = db.Column(db.Integer, db.ForeignKey('subwaystops.id'))


class Station(db.Model, SerializerMixin):
    __tablename__ = 'stations'
    
    serialize_rules = ('-subwaystops.station',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    borough = db.Column(db.String)
    routes = db.Column(db.String)
    lat = db.Column(db.Integer)
    lng = db.Column(db.Integer)
    uptown = db.Column(db.String)
    downtown = db.Column(db.String)

    subwaystops = db.relationship('SubwayStop', back_populates='station')
                                  
class SubwayStop(db.Model, SerializerMixin):
    __tablename__ = 'subwaystops'

    serialize_rules = ('-station.subwaystops',)

    id = db.Column(db.Integer, primary_key=True)
    route = db.Column(db.String)
    position = db.Column(db.Integer)
    stationname = db.Column(db.String)
    color = db.Column(db.String)

    station_id = db.Column(db.Integer, db.ForeignKey('stations.id'))
    station = db.relationship('Station', back_populates='subwaystops')

    def __repr__(self):
        return f'<SubwayStop>{self.position} along the {self.route} at {self.stationinitials}'