import json
f = open('tldrnewspaperapp/app.json')

data = json.load(f)
print(data["expo"]["ios"]["buildNumber"])

current_buildnumber = data["expo"]["ios"]["buildNumber"]
new_buildnumber = int(current_buildnumber) + 1
data["expo"]["ios"]["buildNumber"] = str(new_buildnumber)

with open('tldrnewspaperapp/app.json', "w") as jsonFile:
    json.dump(data, jsonFile)

