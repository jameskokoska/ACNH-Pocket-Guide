import glob
import json
import os

# SP_owl_Comment_DiveFish.msbt.json
# SP_owl_Comment_Fish.msbt.json
# SP_owl_Comment_Fossil.msbt.json
# SP_owl_Comment_Insect.msbt.json
# SYS_Get_DiveFish.msbt.json
# SYS_Get_Fish.msbt.json
# SYS_Get_Insect.msbt.json
# SYS_Museum_Art.msbt.json

def process_json_files(folder, out_name):
    files = glob.glob(folder + '/**/*.json', recursive=True)
    json_files = [file for file in files]

    result_data = {}

    for file_name in json_files:
        with open(file_name, 'r', encoding='utf-8-sig') as file:
            data = json.load(file)
            for obj in data:
                if 'label' in obj:
                    result_data[obj['label']] = obj["locale"]
            
    with open('Generated/' + out_name + '.json', 'w', encoding='utf-8-sig') as output_file:
        json.dump(result_data, output_file, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    process_json_files('./TranslationsStrings/CatchPhrase', 'translatedCatchphrases')
    process_json_files('./TranslationsStrings/Museum', 'translatedMuseumDescriptions')
    input("Done!")