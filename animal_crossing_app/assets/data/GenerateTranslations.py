import glob
import json
import codecs

languages = [
    ["Chinese","CNzh"],
    ["German","EUde"],
    ["English (Europe)","EUen"],
    ["Spanish","EUes"],
    ["French","EUfr"],
    ["Italian","EUit"],
    ["Dutch","EUnl"],
    ["Russian","EUru"],
    ["Japanese","JPja"],
    ["Korean","KRko"],
    ["Chinese (Traditional)","TWzh"],
    ["English","USen"],
    ["Spanish (US)","USes"],
    ["French (US)","USfr"]
]

key = {"English":"USen"}


files = glob.glob('./TranslationsStrings/Strings' + '/**/*.json', recursive=True)

allTranslationEntry = []
allTranslationEntryObject = {}
length = 0
print("Reading " + str(len(files)) + " files...")
for file in files:
    with open(file, encoding='utf-8-sig') as d:
        data = json.load(d)
        for entry in data:
            translationEntry = {}
            for language in languages:
                translationEntry[language[0]] = entry["locale"][language[1]]
            allTranslationEntry.append(translationEntry)
    allTranslationEntryObject[file.replace("\\","").replace("/","").replace(".","")] = allTranslationEntry
    length+=1
    print(str(int(length/len(files)*100))+"%")

print("Writing...")
with open('translationsNewOutput.json', 'w', encoding='utf8') as json_file:
    json.dump(allTranslationEntryObject, json_file, ensure_ascii=False,indent=2)             

print("Converting Villager translations")
file = glob.glob('./TranslationsStrings/Villagers.json')
allTranslationEntry = {}
allTranslationEntryObject = {}
with open(file[0], encoding='utf-8-sig') as d:
    data = json.load(d)
for entry in data:
    translationEntry = {}
    for language in languages:
        translationEntry[language[0]] = entry["locale"][language[1]]
    allTranslationEntry[entry["locale"][key["English"]]] = translationEntry

print("Writing...")
with open('Generated/translatedVillagers.json', 'w', encoding='utf8') as json_file:
    json.dump(allTranslationEntry, json_file, ensure_ascii=False,indent=2)             


input("Done")
