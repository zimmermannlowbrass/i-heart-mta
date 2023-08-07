#!/usr/bin/env python3

import pandas as pd


STATIONS_FILE = "../Stations.csv"

class Stations:
  def __init__(self):
    self.stations_file = STATIONS_FILE
    self.stations_df = pd.read_csv(STATIONS_FILE)
    self.stations = self.stations_df.values

  def get_subwaylines(self):
    subwayslist = []
    for station in self.stations:
      for subway in station[7]:
        if subway != ' ':
          subwayslist.append(subway)
    return list(set(subwayslist))

  def get_stations(self):

    list_of_stations = []
    for station in self.stations_df.values:
      name = station[5].replace('-', ' ')
      routes = station[7].replace(' ', '')
      stationinfo = [name, station[6], routes, station[9], station[10], station[11], station[12]]
      list_of_stations.append(stationinfo)
    return list_of_stations







  

 