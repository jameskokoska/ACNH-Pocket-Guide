import json
import codecs

alreadyCovered = '''
Coral Nook Inc. aloha shirt
Green Nook Inc. aloha shirt
34%
36%
39%
42%
44%
47%
50%
52%
55%
57%
Hazure01
Hazure02
Hazure03
60%
63%
65%
68%
71%
73%
Bell bag
Bell coin
present (black)
present (blue)
present (brown)
present (chartreuse)
present (gold)
present (gray)
present (green)
present (light-blue)
present (mint)
present (navy)
present (orange)
present (pink)
present (purple)
present (red)
present (white)
present (yellow)
spoiled turnips
turnips
76%
78%
81%
(island name) Miles!
Angling for Perfection!
Island Ichthyologist
Island Togetherness
You've Got the Bug
Bugs Don't Bug Me
Have a Nice DIY!
Deep Dive
Underwater Understudy
DIY Tools
DIY Furniture
Furniture Freshener
Rough-hewn
Trashed Tools
Rock-Splitting Champ
Bona Fide Bone Finder!
Fossil Assessment
Greedy Weeder
Flower Power
Flower Tender
Tomorrow's Trees Today
Pick of the Bunch
Fruit Roots
Shrubbery Hububbery
Go Ahead. Be Shellfish!
Clam and Collected
Trash Fishin'
Cast Master
Dream House
Decorated Decorator
Hoard Reward
Good Things in Store!
Remarkable Remodeler
Smile Isle
Reaction Ruler
Island Shutterbug
Edit Credit
NookPhone Life
That's One Smart Phone
Shop to It
Growing Collection
Nook Miles for Miles!
First-Time Buyer
Seller of Unwanted Stuff
Moving Fees Paid!
Bell Ringer
Miles for Stalkholders
Cornering the Stalk Market
No More Loan Payments!
Bulletin-Board Benefit
Popular Pen Pal
Flea Flicker
Cicada Memories
Netting Better!
Pit-y Party!
Taking the Sting Out
Faint of Heart
Overcoming Pitfalls
Faked Out!
Lost Treasure
It's Raining Treasure!
Fun with Fences
Snowmaestro
Wishes Come True
Exterior Decorator
(island name) Icons
Island Designer
Wispy Island Secrets
Gulliver's Travails
K.K. Mania
True Patron of the Arts
You Otter Know
True Friends
Birthday Celebration
Happy Birthday!
Fishing Tourney!
Bug-Off!
Countdown Celebration
Making a Change
First Custom Design!
Custom Design Pro!
Paydirt!
Shady Shakedown
Golden Milestone
Island and Yourland
Host the Most
Active Island Resident
84%
86%
Blanca
Blathers
Booker
Brewster
C.J.
Celeste
Chip
Cyrus
Daisy Mae
Digby
DJ KK
Don
Flick
Franklin
Gracie
Grams
Gullivarrr
Gulliver
Harriet
Harvey
Isabelle
Jack
Jingle
Joan
K.K.
Kapp'n
Katie
Katrina
Kicks
Label
Leif
Leila
Leilani
Lottie
Luna
Lyle
Mabel
Nat
Orville
Pascal
Pavé
Pelly
Pete
Phineas
Phyllis
Porter
Redd
Reese
Resetti
Rover
Sable
Saharah
Shrunk
Timmy
Tom Nook
Tommy
Tortimer
Wendell
Wilbur
Wisp
Wisp
Zipper
89%
92%
Acorn card
Airmail card
Baby-goods card
Balloons card
Bandage card
Beach card
Birthday-cake card
Blue-sky card
Bunny Day card
Camo card
Card from
Card from Bank of Nook
Card from C.J.
Card from Flick
Card from Happy Home Academy
Card from Jolly Redd's
Card from K.K.
Card from Nintendo
Card from Nook Mileage Program
Card from Your pals at Dodo Airlines
Carpet-of-leaves card
Cherry-blossoms card
Chocolate card
Chocolate-heart card
Common card
Cool-cool card
Dandelion card
Decorative card
Elegant-roses card
Fanciful card
Fantasy-stars card
Father's Day card
Festive-tree card
Flower-bouquet card
Fluffy-clouds card
Full-bloom card
Gears card
Gem card
Gift card
Goldfish card
Graduation card
Graffiti card
Halloween card
Happy-clovers card
Turkey Day card
Hibiscus card
Holiday card
Lovely hearts card
Mother's Day card
Mushroom card
Pumpkin card
Red-dragonflies card
Ribbon card
Shapes card
Shooting-stars card
Snowflake card
Snowperson card
So-many-hearts card
Star card
Stationery-goods card
Torn card
Town-view card
Velvety card
Warm-sweater card
Wedding card
Winter-camellia card
Zen card
94%
acorns and pine cones
mushrooms
ornaments
Spring shopping
Summer shopping
Fall shopping
Winter shopping
Festive shopping
Birthday
Fishing Tourney
Bunny Day (ready days)
Bunny Day
May Day
International Museum Day
Wedding Season
Summer Solstice (northern hemisphere)
Winter Solstice (southern hemisphere)
Tanabata
Fireworks Show
Halloween (ready days)
Halloween
Turkey Day
Turkey Day (shopping days)
Toy Day (ready days phase 1)
Toy Day (ready days phase 2)
Toy Day
Toy Day (day after)
Winter Solstice (northern hemisphere)
Summer Solstice (southern hemisphere)
Shōgatsu (1)
Shōgatsu (2)
Shōgatsu (3)
New Year's Day (Russia)
New Year's Day (World)
New Year's Day (Korea)
New Year's Day (Asia)
Festivale (ready days)
Festivale
Setsubun (Able Sisters)
Big Game Celebration (1)
Big Game Celebration (2)
Valentine's Day (Nook Shopping)
Super Mario Bros.
Shamrock Day (Able Sisters)
Prom (1)
Prom (2)
Prom (Able Sisters)
Nature Day (Nook Shopping)

'''

print("Matching [Name] and [English]... from data.json and translations.json")
count=0
length=0
outputDictionary = {}
ignore = ["Changelog","READ ME","Variants","Patterns","HHA Themes","HHA Set","HHA Situation","Special NPCs","Villagers Catch Phrase"]
with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)
with open('translations.json', encoding='utf-8-sig') as t:
    translation = json.load(t)

for dataSheet in data:
    for datum in data[dataSheet]:
        found = False
        for translationSheet in translation:
            if(translationSheet in ignore):
                continue
            for translate in translation[translationSheet]:
                if(datum.get("Name")==None or translate.get("English")==None):
                    break
                elif(datum.get("Name")==translate.get("English")):
                    #datum.update(translate)                            
                    outputDictionary[translate.get("English")] = translate
                    found = True
        if(found == False):
            if(datum.get("Name")!=None and datum.get("Name") not in alreadyCovered.split("\n")):
                print(datum.get("Name"))

    length+=1
    print(str(int(length/len(data)*100))+"%")
    
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
                        
                    
