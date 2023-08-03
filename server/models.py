from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
import sqlalchemy as sa

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-trips.user', '-_password_hash')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    borough = db.Column(db.String)
    role = db.Column(db.String)
    name = db.Column(db.String)
    _password_hash = db.Column(db.String)

    trips = db.relationship('Trip', backref='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('name')
    def validate_name(self, key, name):
        if (len(name) > 30):
            raise ValueError('Name field cannot be longer than 30 characters.')
        return name
    
    @validates('borough')
    def validate_name(self, key, borough):
        if (borough not in ['Manhattan', 'Brooklyn', 'Bronx', 'Queens']):
            raise ValueError('Borough must be either Manhattan, Brooklyn, Bronx, or Queens. NO STATEN ISLAND.')
        return borough
    
    @validates('username')
    def validate_name(self, key, username):
        if (self.name == username):
            raise ValueError('Username must be different than name.')
        return username

    def __repr__(self):
        return f'<User>{self.name}'
    

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    serialize_rules = ('-subwaystops.station', '-start.start', '-stop.stop', '-user.trips')

    id = db.Column(db.Integer, primary_key=True)
    isFavorite = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))    

    start_id = db.Column(db.Integer, db.ForeignKey('subwaystops.id'))
    stop_id = db.Column(db.Integer, db.ForeignKey('subwaystops.id'))

    start = db.relationship('SubwayStop', backref='start', foreign_keys=[start_id])
    stop = db.relationship('SubwayStop', backref='stop', foreign_keys=[stop_id])  
    

class Station(db.Model, SerializerMixin):
    __tablename__ = 'stations'
    
    serialize_rules = ('-subwaystops.station', '-subwaystops.start')

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

    serialize_rules = ('-station.subwaystops', '-stop', '-start',)

    id = db.Column(db.Integer, primary_key=True)
    route = db.Column(db.String)
    position = db.Column(db.Integer)
    stationname = db.Column(db.String)
    color = db.Column(db.String)

    station_id = db.Column(db.Integer, db.ForeignKey('stations.id'))
    station = db.relationship('Station', back_populates='subwaystops')

    # trips = db.relationship('Trip', primaryjoin="SubwayStop.id==Trip.subwaystops_id")

    def __repr__(self):
        return f'<SubwayStop>{self.position} along the {self.route}'