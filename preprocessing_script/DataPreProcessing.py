# -*- coding: utf-8 -*-
"""
Created on Fri May 22 10:57:37 2020

@author: olafw
"""

import pandas as pd
import geopandas

###Files import
#import current season of the PL 
seas1 = pd.read_csv("./E0.csv")
#import WGS84 location of stadiums
stadiums = pd.read_csv("./stadiums-with-GPS-coordinates.csv")
#import NUTS2 regions
#nuts2 = geopandas.read_file('./NUTS2_countiesUK.json')

#select only stadiums in England
stadEngland = stadiums[stadiums["Country"] == 'England']




####First IDEA#####
# "Home Fortress - count most home wins per team"

hWins = seas1[seas1["FTR"] == 'H'] #select only home wins
hWinsC = hWins["HomeTeam"].value_counts() #count home wins
# convert to dataframe 
hWinsCount = hWinsC.to_frame() #come back to data frame

hWinsCount['key'] = hWinsCount.index

#add WGS84 location to stadiums
winHomTeamLoc = pd.merge(hWinsCount, stadEngland, how='left', left_on='key', right_on='FDCOUK') #left join

#Save as csv
winHomTeamLoc.to_csv('HomeWins2019_2020.csv', index=False)

#save as geoDataFrame
gdf = geopandas.GeoDataFrame(winHomTeamLoc, geometry=geopandas.points_from_xy(winHomTeamLoc.Longitude, winHomTeamLoc.Latitude))
gdf.to_file("HomeWins2019_2020.geojson", driver='GeoJSON')
