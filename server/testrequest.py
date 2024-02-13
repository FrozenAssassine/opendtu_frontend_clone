import requests

res = requests.get('https://frozenassassine.de/api/solarData/live')
print(res.status_code)