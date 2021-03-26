import json
import codecs
with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)

filters = [
    [
        "Recipes",
        [data["Recipes"]],
        ["Category", "Source","Season/Event","Season/Event Exclusive"]
    ],
    [
        "Reactions",
        [data["Reactions"]],
        ["Source"]
    ],
    [
        "Music",
        [data["Music"]],
        ["Source","Source Notes","Catalog"]
    ],
    [
        "Furniture",
        [
            data["Housewares"],
            data["Miscellaneous"],
            data["Wall-mounted"],
            data["Photos"],
            data["Posters"]
        ],
        ["Tag", "Catalog", "Color 1","Color 2","Variation","Source", "DIY", "Size", "Season/Event", "Season/Event Exclusive", "HHA Concept 1", "HHA Concept 2", "HHA Series", "HHA Set", "HHA Category"]
    ],
    [
        "Clothing",
        [
            data["Headwear"],
            data["Accessories"],
            data["Tops"],
            data["Dress-Up"],
            data["Clothing Other"],
            data["Bottoms"],
            data["Socks"],
            data["Shoes"],
            data["Bags"],
            data["Umbrellas"],
        ],
        ["Catalog", "Style 1","Style 2","Color 1","Color 2","Variation","Seasonality","Source", "DIY", "Size", "Season/Event", "Season/Event Exclusive", ]
    ],
    [
        "Floor & Walls",
        [
            data["Floors"],
            data["Rugs"],
            data["Wallpaper"]
        ],
        ["Tag","Color 1","Color 2","Source","DIY","Size","Season/Event", "Season/Event Exclusive", "HHA Concept 1", "HHA Concept 2", "HHA Series",]
    ],
    [
        "Fish",
        [
            data["Fish"]
        ],
        ["Where/How","Shadow"]
    ],
    [
        "Bugs",
        [
            data["Insects"]
        ],
        ["Weather","Where/How"]
    ],
    [
        "Sea Creatures",
        [
            data["Sea Creatures"],
        ],
        ["Shadow","Movement Speed"]
    ],
    [
        "Villagers",
        [
            data["Villagers"]
        ],
        ["Personality","Species","Hobby","Style 1","Style 2","Color 1","Color 2"]
    ],
    [  
        "All Items",
        [
            data["Housewares"],
            data["Miscellaneous"],
            data["Wall-mounted"],
            data["Photos"],
            data["Posters"],
            data["Headwear"],
            data["Accessories"],
            data["Tops"],
            data["Dress-Up"],
            data["Clothing Other"],
            data["Bottoms"],
            data["Socks"],
            data["Shoes"],
            data["Bags"],
            data["Umbrellas"],
            data["Floors"],
            data["Rugs"],
            data["Wallpaper"],
            data["Recipes"],
            data["Tools"],
            data["Fish"],
            data["Insects"],
            data["Sea Creatures"],
            data["Fossils"],
            data["Art"],
            data["Villagers"],
            data["Music"],
            data["Reactions"],
            data["Construction"],
            data["Fencing"],
            data["Other"],
        ],
        [
            "Source",
            "Tag",
            "DIY",
            "Catalog",
            "Where/How",
            "Weather",
            "Shadow",
            "Movement Speed",
            "Season/Event",
            "Category",
            "Season/Event Exclusive",
            "Seasonality",
            "Personality",
            "Species",
            "Hobby",
            "Style 1",
            "Style 2",
            "Color 1",
            "Color 2",
            "Variation",
            "Style 1",
            "Style 2",
            "Size",
            "HHA Concept 1",
            "HHA Concept 2",
            "HHA Series",
            "HHA Set",
            "HHA Category"
        ]
    ]
]

possibleFilters = []
count = -1
count2 = -1
output = {}
for filterSet in filters:
    count+=1
    count2 = -1
    print("Generating filter definitions: " + str(int(count/len(filters) * 100)) + "%")
    for filter in filterSet[2]:
        count2+=1
        print("Generating filter definitions:   " + str(int(count2/len(filterSet[2]) * 100)) + "%")
        for dataSet in filterSet[1]:
            for datum in dataSet:
                if(datum.get(filter)==None):
                    continue
                currentFilter = {"label":"", "value":""}
                found = False
                if len(possibleFilters)!=0:
                    for possibleFilter in possibleFilters:
                        if possibleFilter.get("value")==filter+ ":" +datum.get(filter):
                            found = True
                if found==False:
                    currentFilter["label"] = filter+ " - " + datum.get(filter)
                    currentFilter["value"] = filter+ ":" + datum.get(filter)
                    possibleFilters.append(currentFilter)
    output[filterSet[0]] = possibleFilters
    possibleFilters = []

with open('Generated/filterDefinitions.json', 'w', encoding='utf8') as json_file:
    json.dump(output, json_file, ensure_ascii=False,indent=2)
input("Done")
