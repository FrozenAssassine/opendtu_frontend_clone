import requests

with open('../public/alldata.txt') as f:
    content = f.read()

print(content)

res = requests.post("https://frozenassassine.de/openDTU/alldata", json={'text': content})

print(res.status_code)