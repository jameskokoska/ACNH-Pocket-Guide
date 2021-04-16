import json
import codecs

count=0
length=0
outputDictionary = {}
with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)


done=[]
propertyDatum=input("What property?")
for dataSheet in data:
    for datum in data[dataSheet]:
        if(datum.get(propertyDatum) not in done):
            print(datum.get(propertyDatum))
            done.append(datum.get(propertyDatum))
                        
                    
