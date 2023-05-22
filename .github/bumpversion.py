#Bumping the version of our build by one on each CI run
import json
f = open('tldrnewspaperapp/app.json')

data = json.load(f)

print("Old buildnumber is: ")
print(data["expo"]["ios"]["buildNumber"])

current_buildnumber = data["expo"]["ios"]["buildNumber"]
new_buildnumber = int(current_buildnumber) + 1
data["expo"]["ios"]["buildNumber"] = str(new_buildnumber)

with open('tldrnewspaperapp/app.json', "w") as jsonFile:
    json.dump(data, jsonFile)


a = open('tldrnewspaperapp/app.json')
new_data = json.load(a)

print("New version number is:")
print(new_data["expo"]["ios"]["buildNumber"])