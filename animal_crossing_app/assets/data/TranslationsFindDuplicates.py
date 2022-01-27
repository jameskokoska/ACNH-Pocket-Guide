import json
import codecs

print("Loading files")
with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)

totalFound = []
repeatNames = []
previousName = ""
ignoreSheets = ["Recipes","Villagers","Seasons and Events"]
print("Finding repeat names, useful when dealing with translations")
for sheet in data:
    if(sheet not in ignoreSheets):
        for entry in data[sheet]:
            if("Name" in entry.keys() and entry["Name"]==previousName):
                continue
            else:
                if("Name" in entry.keys() and entry["Name"] in totalFound):
                    print(entry["Name"])
                    repeatNames.append(entry["Name"])
                elif("Name" in entry.keys()):
                    totalFound.append(entry["Name"])
            if("Name" in entry.keys()):
                previousName = entry["Name"]

if(True):        
    for sheet in data:
        if(sheet not in ignoreSheets):
            for entry in data[sheet]:
                if("Name" in entry.keys() and entry["Name"] in repeatNames):
                    print(sheet)
                    print(entry)

