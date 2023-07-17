#!/usr/bin/env python3

from bs4 import BeautifulSoup
import requests

def scraper(subway):
    headers = {'user-agent': 'my-app/0.0.1'}
    html = requests.get(f"https://new.mta.info/maps/subway-line-maps/{subway}-line", headers=headers)

    doc = BeautifulSoup(html.text, 'html.parser')

    courses = doc.select('.col_0')[1:]

    route = []
    for course in courses:
        content = str(course.contents[0])
        content = content[3: 6]
        if content != 'Sub' and content != 'Su':
            route.append(content)
    return route
