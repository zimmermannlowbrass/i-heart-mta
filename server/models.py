from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)


class Station(db.Model):
    __tablename__ = 'stations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    borough = db.Column(db.String)
    uptown = db.Column(db.String)
    downtown = db.Column(db.String)

    subwaystops = db.relationship('SubwayStop', backref='station')
                                  
class SubwayStop(db.Model):
    __tablename__ = 'subwaystops'

    id = db.Column(db.Integer, primary_key=True)
    route = db.Column(db.String)
    position = db.Column(db.Integer)
    stationinitials = db.Column(db.String)
    color = db.Column(db.String)

    station_id = db.Column(db.Integer, db.ForeignKey('stations.id'))
