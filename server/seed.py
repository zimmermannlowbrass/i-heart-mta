#!/usr/bin/env python3
from app import app
from models import db, User, SubwayStop, Station, Trip

from scrape import scraper
from scrape_helper import color_of_subway_route
from stations import Stations



if __name__ == '__main__':
    with app.app_context():

        User.query.delete()
        SubwayStop.query.delete()
        Station.query.delete()
        Trip.query.delete()


        user = User(username='Bob', password='password')

        db.session.add(user)

        stationdata = Stations().get_stations()
        stations = []
        print('**\nCurrently grabbing all stations\n**')
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

        print('**\nAll stations have been added!\n**')
        subways = Stations().get_subwaylines()
        subwaystops = []
        for subway in subways:
            color = color_of_subway_route(subway)
            print(f'Currently gathering data for the {subway} train.')
            scrape = scraper(subway)
            count = 1
            for data in scrape:
                subwaystop = SubwayStop(
                    stationname=data,
                    route=subway,
                    position=count,
                    color=color
                )
                for x in range(len(stations)):
                    if stations[x].name == data:
                        if subway in stations[x].routes:
                            subwaystop.station = stations[x]
                subwaystops.append(subwaystop)
                count += 1


        db.session.add_all(subwaystops)
        db.session.commit()