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
      stationinfo = [station[5], station[6], station[11], station[12]]
      list_of_stations.append(stationinfo)
    return list_of_stations

    # list_of_trains = []
    # for station in self.stations_df.values:
    #   for trains in station[7]:
    #     for train in trains:
    #       if (train != ' ') and (train not in list_of_trains):
    #           list_of_trains.append(train)


    # list_of_dict_trains = []
    # for train in trains:
    #     dictionary = dict()
    #     dictionary[train] = None
    #     list_of_dict_trains.append(dictionary)

    # train_dict = dict()
    # for train in list_of_trains:
    #   train_dict[train] = []

    # for station in self.stations_df.values:
    #   for trains in station[7]:
    #     for train in trains:
    #       for key, value in train_dict.items():
    #         if train == key:
    #           value.append([station[5], station[0]])
    
    # def myFunc(e):
    #   return e[2]

    # train_dict['2'].sort(key=myFunc)
    return train_dict['M']




# stations = Stations()
# print(stations.get_stations())







    # stops = {}
    # # each station is indexed by location
    # stations = []
    # for row in self.stops_df.itertuples():
    #   stations.append(str(row.stop_name))   
    # stations = list(set(stations))

    # count = 0
    # for station in stations:
    #   stops[count] = {'station_id': count, 'name': station, 'stop_ids': []}
    #   name_found = False
    #   for row in self.stops_df.itertuples():
    #     if  str(row.stop_name) == station:
    #       if name_found == False:
    #         stops[count]['name'] = row.stop_name
    #         name_found = True
    #       stopId = row.stop_id
    #       if stopId[-1] == "N" or stopId[-1] == "S":
    #         continue
    #       else:
    #         stops[count]['stop_ids'].append(stopId)
    #   count += 1
    # stops2 = []
    # for count in stops.keys():
    #   stops2.append(stops[count])
    # return stops2


    # for station in self.stations_df.values:
    #   for trains in station[7]:
    #     for train in trains:
    #       for key, value in train_dict.items():
    #         if train == key:
    #           value.append(station[5])
    # print(train_dict['F'])
    # f_stops = []
    # for train in train_dict['2']:
    #   f_stops.append(train)


    # stops = []
    # for stop in self.stops_df.values:
    #   if stop[0][0] == 'F':
    #     stops.append(stop[2])
    # print(stops)

    # unique_stops = []
    # for stop in stops:
    #   if stop not in unique_stops:
    #     unique_stops.append(stop)
    #     print(stop)

    






  

 