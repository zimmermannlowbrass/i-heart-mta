from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
import sqlalchemy as sa

from config import db, bcrypt

# trip_subwaystop = db.Table(
#     "trip_subwaystop",
#     db.Column("trip_id", db.ForeignKey('trips.id'), primary_key=True),
#     db.Column("subwaystop_id", db.ForeignKey('subwaystops.id'), primary_key=True),
# )

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-trips.user', '-_password_hash',)


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    borough = db.Column(db.String)
    description = db.Column(db.String)
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

    def __repr__(self):
        return f'<User>{self.username}'
    

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    serialize_rules = ('-subwaystops.trips', '-user.trips', )

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    start_lat = db.Column(db.Float)
    start_lng = db.Column(db.Float)
    end_lat = db.Column(db.Float)
    end_lng = db.Column(db.Float)
    color = db.Column(db.String)
    stops_travled = db.Column(db.Integer)
    route = db.Column(db.String)
    forwardDirection = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    subwaystops_id = db.Column(db.Integer, db.ForeignKey('subwaystops.id'))
    subwaystops = db.relationship('SubwayStop', back_populates='trips')
    

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

    serialize_rules = ('-station.subwaystops', '-trips.subwaystops')

    id = db.Column(db.Integer, primary_key=True)
    route = db.Column(db.String)
    position = db.Column(db.Integer)
    stationname = db.Column(db.String)
    color = db.Column(db.String)

    station_id = db.Column(db.Integer, db.ForeignKey('stations.id'))
    station = db.relationship('Station', back_populates='subwaystops')

    trips = db.relationship('Trip', back_populates='subwaystops')
    

    def __repr__(self):
        return f'<SubwayStop>{self.position} along the {self.route}'