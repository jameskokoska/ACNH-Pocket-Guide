import json
import codecs

print("Matching [Name] and [English]... from input.json and translation.json")
input("Press any [Enter] to start")
count=0
length=0
variantsPatterns = []
doneVariants = []
with open('input.json', encoding='utf-8-sig') as d:
    data = json.load(d)
    with open('translation.json', encoding='utf-8-sig') as t:
        translation = json.load(t)
        
        for dataSheet in data:
            for datum in data[dataSheet]:
                for translationSheet in translation:
                    if("Changelog" in translationSheet or "READ ME" in translationSheet):
                        continue
                    for translate in translation[translationSheet]:
                        if(datum.get("Name")==None or translate.get("English")==None):
                            break
                        elif("Variants" in translationSheet or "Patterns" in translationSheet):
                            if(translate.get("English") in doneVariants):
                                continue
                            else:
                                doneVariants.append(translate.get("English"))
                                variantsPatterns.append(translate)
                        elif(datum.get("Name")==translate.get("English")):
                            datum.update(translate)

            length+=1
            print(str(int(length/len(data)*100))+"%")
    
        with open('data.json', 'w', encoding='utf8') as json_file:
            json.dump(data, json_file, ensure_ascii=False,indent=2)
        with open('variantsTranslated.json', 'w', encoding='utf8') as json_file:
            json.dump(variantsPatterns, json_file, ensure_ascii=False,indent=2)
        input("Done")

                        
                    
