import json
import codecs
with open('translationsApp.json', encoding='utf-8-sig') as d:
    data = json.load(d)

output = {}
for sheet in data:
    output[sheet] = {}
    skipFirst = True
    if(sheet=="Google Play Store Listing"):
        continue
    for item in data[sheet]:
        #The first item is the count, not a translation
        if(skipFirst):
            skipFirst = False
            continue
        if("English" in item.keys()):
            output[sheet][item["English"].lower()] = item
with open('Generated/translationsAppGenerated.json', 'w', encoding='utf8') as json_file:
    json.dump(output, json_file, ensure_ascii=False,indent=2)
input("Done!")
