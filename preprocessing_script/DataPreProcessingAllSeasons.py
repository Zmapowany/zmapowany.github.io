# -*- coding: utf-8 -*-
"""
Created on Fri May 22 10:57:37 2020

@author: olafw
"""

import pandas as pd
import geopandas
import glob


###Files import
path = './PLdata' # use your path
all_files = glob.glob(path + "/*.csv")

li = []

for filename in all_files:
    df = pd.read_csv(filename, index_col=None, header=0)
    li.append(df)

allSeasons = pd.concat(li, axis=0, ignore_index=True)


#import current season of the PL 
#seas = pd.read_csv("./E0.csv")
#import WGS84 location of stadiums
stadiums = pd.read_csv("./stadiums.csv")
#import NUTS2 regions
#nuts2 = geopandas.read_file('./NUTS2_countiesUK.json')

#select only stadiums in England
stadEngland = stadiums[stadiums["Country"] == 'England']




####First IDEA#####
# "Home Fortress - count most home wins per team"

hWins = allSeasons[allSeasons["FTR"] == 'H'] #select only home wins
hWinsC = hWins["HomeTeam"].value_counts() #count home wins
# convert to dataframe 
hWinsCount = hWinsC.to_frame() #come back to data frame

hWinsCount['key'] = hWinsCount.index

#add WGS84 location to stadiums
winHomTeamLoc = pd.merge(hWinsCount, stadEngland, how='left', left_on='key', right_on='FDCOUK') #left join

#Save as csv
winHomTeamLoc.to_csv('HomeWinsAllSeasons.csv', index=False)

#save as geoDataFrame
gdf = geopandas.GeoDataFrame(winHomTeamLoc, geometry=geopandas.points_from_xy(winHomTeamLoc.Longitude, winHomTeamLoc.Latitude))
gdf.to_file("HomeWinsAllSeasons.geojson", driver='GeoJSON')
