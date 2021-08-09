import json
import codecs
import glob
import pyperclip



#Get the item to paste in ACNH Pocket Guide translation text under Missing Items
keysOrder = ["USen","EUen","EUfr","USfr","EUde","EUes","USes","EUit","EUnl","TWzh","CNzh","JPja","KRko","EUru"]

files = glob.glob("*.json")
count=0
length=0
outputDictionary = {}

itemName = "test"
while itemName!="":
    itemName=input("Enter item name: ")
    for file in files:
        with open(file, encoding='utf-8-sig') as d:
            data = json.load(d)
            for datum in data:
                if(datum.get("locale").get("USen") == itemName):
                    string = ""
                    for key in keysOrder:
                        string += datum.get("locale").get(key) + "\t"
                    pyperclip.copy(string)
                    print("copied to clipboard")
