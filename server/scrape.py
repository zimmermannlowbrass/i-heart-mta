#!/usr/bin/env python3

from bs4 import BeautifulSoup
import requests

from stations import Stations

def scraper(subway):
    headers = {'user-agent': 'my-app/0.0.1'}
    html = requests.get(f"https://new.mta.info/maps/subway-line-maps/{subway}-line", headers=headers)

    doc = BeautifulSoup(html.text, 'html.parser')

    courses = doc.select('.col_0')[1:]

    route = []
    for course in courses:
        content = str(course.contents[0])
        content = content[3: -4]
        if content != 'Subway Station':
            route.append(content)
        # content = content[3: -4]
    return route

scrape = scraper(1)
# print(scrape)

stations = Stations().get_stations()
for station in stations:
    if '1' in station[2]:
        print(station)
