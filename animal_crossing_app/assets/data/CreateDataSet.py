import json
import codecs


with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)

outSet = set()
for sheet in data:
    if(sheet=="Villagers"or sheet=="Paradise Planning"):
        print("Skipping villagers")
        continue
    for datum in data[sheet]:
        if("Name" in datum):
            outSet.add(datum["Name"][0].upper() + datum["Name"][1:])
f = open('DataCreated/'+"dataSet.dart", "w", encoding="utf-8")
f.write("Set dataset=" + str(outSet)+";")
f.close()
input("Done!")
