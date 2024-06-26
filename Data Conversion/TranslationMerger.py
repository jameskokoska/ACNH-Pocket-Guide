import json
import codecs

print("Matching [Name] and [English]... from data.json and translations.json")
propertiesToCheck = ["Name","Description", "Achievement Description","Achievement Criteria","Tier 1 Modifier", "Tier 2 Modifier", "Tier 3 Modifier", "Tier 4 Modifier", "Tier 5 Modifier", "Tier 6 Modifier", "Tier 1 Noun", "Tier 2 Noun", "Tier 3 Noun", "Tier 4 Noun", "Tier 5 Noun", "Tier 6 Noun"]
count=0
length=0
outputDictionary = {}
ignore = ["Changelog","READ ME","Variants","Patterns","HHA Themes","HHA Set","HHA Situation","Special NPCs","Villagers Catch Phrase"]

print("Loading files")
with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)
with open('translations.json', encoding='utf-8-sig') as t:
    translation = json.load(t)
with open('translationsApp.json', encoding='utf-8-sig') as f:
    translationsApp = json.load(f)
print("Starting...")

def alreadyTranslated(text):
    if(text==None):
        return True
    for sheet in translationsApp:
        for datum in translationsApp[sheet]:
            if(datum.get("English")==None):
                continue
            elif(datum.get("English").lower()==text.lower()):
                return True
    return False
        
sourceNotes = []
sources=[]
missingItems=[]
found = True
previousName = ""
for dataSheet in data:
    for datum in data[dataSheet]:
        if(found==False):
            print("Warning: Could not find translation!")
        if(datum.get("Name")==previousName):
            continue
        found = False
        print(datum.get("Name"))
        previousName = datum.get("Name")
        if(alreadyTranslated(datum.get("Source Notes"))==False and datum.get("Source Notes") not in sourceNotes):
            sourceNotes.append(datum.get("Source Notes"))
            print("New Source Notes")
            print(datum.get("Source Notes"))
        if(alreadyTranslated(datum.get("Source"))==False and datum.get("Source") not in sources):
            if(datum.get("Source")!=None and ";" in datum.get("Source")):
                for sourceSplit in datum.get("Source").split("; "):
                    if(alreadyTranslated(sourceSplit)==False and datum.get("Source") not in sources):
                        sources.append(sourceSplit)
                        print("New Source")
                        print(sourceSplit)
            else:
                print("New Source")
                sources.append(datum.get("Source"))
                print(datum.get("Source"))
        for propertyToCheck in propertiesToCheck:
            for translationSheet in translation:
                if(translationSheet in ignore):
                    continue
                for translate in translation[translationSheet]:
                    if(datum.get(propertyToCheck)==None or translate.get("English")==None):
                        break
                    elif(datum.get(propertyToCheck)==translate.get("English")):
                        #datum.update(translate)                            
                        outputDictionary[translate.get("English")] = translate
                        found = True
            if(found == False):
                if(alreadyTranslated(datum.get(propertyToCheck))==False and datum.get(propertyToCheck) not in missingItems):
                    print("Missing "+propertyToCheck)
                    print(datum.get(propertyToCheck))
                    missingItems.append(datum.get(propertyToCheck))

    length+=1
    print(str(int(length/len(data)*100))+"%")

#print("Missing Items")
#print(missingItems)
#print("Source Notes")
#print(sourceNotes)
#print("Sources")
#print(sources)

with open('Generated/translatedItems.json', 'w', encoding='utf8') as json_file:
    json.dump(outputDictionary, json_file, ensure_ascii=False,indent=2)


doneVariants = []
outputVariantsPatterns = {}
outputSpecialNPCs = {}
outputVillagerSayings = {}
length = 0
for translationSheet in translation:
    for translate in translation[translationSheet]:
        if("Variants" in translationSheet or
            "Patterns" in translationSheet or
            "HHA Themes" in translationSheet or
            "HHA Set" in translationSheet or
            "HHA Situation" in translationSheet):
            if(translate.get("English") in doneVariants):
                continue
            else:
                doneVariants.append(translate.get("English"))
                outputVariantsPatterns[translate.get("English")] = translate
        elif("Special NPCs" in translationSheet):
            outputSpecialNPCs[translate.get("English")] = translate
        elif("Villagers Catch Phrase" in translationSheet):
            outputVillagerSayings[translate.get("English")] = translate
    length+=1
    print(str(int(length/len(translation)*100))+"%")
    
with open('Generated/translatedVariants.json', 'w', encoding='utf8') as json_file:
    json.dump(outputVariantsPatterns, json_file, ensure_ascii=False,indent=2)
with open('Generated/translatedSpecialNPCs.json', 'w', encoding='utf8') as json_file:
    json.dump(outputSpecialNPCs, json_file, ensure_ascii=False,indent=2)
with open('Generated/translatedVillagerCatchPhrases.json', 'w', encoding='utf8') as json_file:
    json.dump(outputVillagerSayings, json_file, ensure_ascii=False,indent=2)

input("Done")
                        
                    
