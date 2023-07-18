#!/usr/bin/env python3


from app import app
from models import db, User, SubwayStop, Station

from scrape import scraper
from stations import Stations

if __name__ == '__main__':
    with app.app_context():

        User.query.delete()
        SubwayStop.query.delete()
        Station.query.delete()

        user = User(username='Bob', password='password')

        db.session.add(user)

        stationdata = Stations().get_stations()
        stations = []
        print('\n\n**\nCurrently grabbing all stations\n**\n\n')
        for data in stationdata:
            station = Station(
                name=data[0],
                borough=data[1],
                routes=data[2],
                lat=data[3],
                lng=data[4],
                uptown=data[5],
                downtown=data[6]
            )
            stations.append(station)

        db.session.add_all(stations)
        print('\n\n**\All stations have been added!\n**\n\n')

        subways = Stations().get_subwaylines()
        subwaystops = []
        for subway in subways:
            print(f'Currently gathering data for the {subway} train.')
            scrape = scraper(subway)
            count = 1
            for data in scrape:
                subwaystop = SubwayStop(
                    stationinitials=data,
                    route=subway,
                    position=count
                )
                for station in stations:
                    if station.name[:3] == data:
                        subwaystop.station = station
                subwaystops.append(subwaystop)
                count += 1


        db.session.add_all(subwaystops)
        db.session.commit()