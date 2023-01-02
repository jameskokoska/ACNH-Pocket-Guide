import json
import codecs
import glob

supportedLanguages = ["EUde","EUen","EUes","EUfr","EUit","EUnl","USen","USes","USfr","English","English (Europe)","French","French (US)","German","Spanish","Spanish (US)","Italian","Dutch"]

with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)

with open('Generated/translatedItems.json', encoding='utf-8-sig') as d:
    translations = json.load(d)
    
translationsFiles = glob.glob('./TranslationsStrings/Strings' + '/**/*.json', recursive=True)

def upperName(name):
    try:
        return str(name)[0].upper() + name[1:]
    except:
        print(name)
        return name

def getItemTranslation(name):
    out = []
    for file in translationsFiles:
        with open(file, encoding='utf-8-sig') as d:
            data = json.load(d)
            for entry in data:
                if(entry["locale"]["USen"]==name):
                    for language in entry["locale"]:
                        if language in supportedLanguages:
                            out.append(entry["locale"][language])
                    return out
    return []

currentIndex = 0
totalCount = 0
totalPercent = 0
for sheet in data:
    totalCount+=len(data[sheet])

outSet = {}
for sheet in data:
    if(sheet=="Construction" or sheet=="Editor Read Me" or sheet=="Villagers" or sheet=="Paradise Planning" or sheet=="Seasons and Events" or sheet=="Message Cards" or sheet=="Unused Unique IDs" or sheet=="Read Me" or sheet=="Achievements" or sheet=="Special NPCs"):
        print("-Skipping " + sheet)
        continue
    print(sheet)
    for datum in data[sheet]:
        if int(currentIndex / totalCount*100)!=totalPercent:
            print(str(totalPercent) + "%")
        totalPercent = int(currentIndex / totalCount*100)
        currentIndex+=1
        if("Name" in datum):
            outSet[upperName(datum["Name"])] = {"n":upperName(datum["Name"])}
            if datum["Name"] in translations:
                for language in translations[datum["Name"]]:
                    if language in supportedLanguages:
                        outSet[upperName(translations[datum["Name"]][language])] = {"n":upperName(datum["Name"])}
            else:
                itemTranslations = getItemTranslation(datum["Name"])
                for itemTranslation in itemTranslations:
                    outSet[upperName(itemTranslation)] = {"n":upperName(datum["Name"])}
# for out in outSet:
#     print(out)
print("Writing...")

with open('DataScanner/'+'dataSetTranslations.json', 'w', encoding='utf8') as json_file:
    json.dump(outSet, json_file, ensure_ascii=False,indent=2)
input("Done!")
