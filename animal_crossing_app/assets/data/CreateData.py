import json
import codecs


with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)


for sheet in data:
    with open('DataCreated/'+sheet+'.json', 'w', encoding='utf8') as json_file:
        json.dump(data[sheet], json_file, ensure_ascii=False,indent=2)

input("Done!")
