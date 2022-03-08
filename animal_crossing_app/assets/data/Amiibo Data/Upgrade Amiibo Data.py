#This will add the personality type (and other villager data) of the villager to it's object
import json
import codecs
import os

path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'DataCreated'))+"/Villagers.json"

with open(path, encoding='utf-8-sig') as d:
    data = json.load(d)

amiiboPath = input("JSON Amiibo file name?")
with open(amiiboPath, encoding='utf-8-sig') as t:
    amiiboData = json.load(t)


amiiboIndex = 0
totalFound = 0
for amiibo in amiiboData:
    found = False
    for villager in data:
        if(amiibo["Name"]==villager["Name"]):
            amiiboData[amiiboIndex]["Personality"] = villager["Personality"]
            amiiboData[amiiboIndex]["Villager"] = "Yes"
            totalFound+=1
            found = True
    if(found==False):
        amiiboData[amiiboIndex]["Personality"] = "NA"
        amiiboData[amiiboIndex]["Villager"] = "No"
    amiiboIndex+=1

with open(amiiboPath, 'w', encoding='utf8') as json_file:
    json.dump(amiiboData, json_file, ensure_ascii=False,indent=2)

print("Done - Found " + str(totalFound) + "/" + str(amiiboIndex))
