#!/usr/bin/env python3

from bs4 import BeautifulSoup
import requests

from stations import Stations
from scrape_helper import fix_spelling_errors_from_scrape

def scraper(subway):
    headers = {'user-agent': 'my-app/0.0.1'}
    html = requests.get(f"https://new.mta.info/maps/subway-line-maps/{subway}-line", headers=headers)

    doc = BeautifulSoup(html.text, 'html.parser')

    courses = doc.select('.col_0')[1:]

    route = []
    for course in courses:
        content = str(course.contents[0])
        content = content[3: -4]
        if 'Subway' not in content:
            content = fix_spelling_errors_from_scrape(content)
            route.append(content)
        # content = content[3: -4]
    return route

scrape = scraper('S')

stations = Stations().get_stations()
for station in stations:
    if 'S' in station[2]:  
        if station[0] not in scrape:
            print(station)
