import json
import codecs

count=0
length=0
outputDictionary = {}
with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)


done=[]
propertySheet=input("What sheet?")
propertyDatum=input("What property?")
if(propertySheet!=""):
    for datum in data[propertySheet]:
        if(datum.get(propertyDatum) not in done):
            print(datum.get(propertyDatum))
            done.append(datum.get(propertyDatum))
else:
    for dataSheet in data:
        for datum in data[dataSheet]:
            if(datum.get(propertyDatum) not in done):
                print(datum.get(propertyDatum))
                done.append(datum.get(propertyDatum))
                        
                    
