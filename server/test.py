import requests

res = requests.post("http://localhost:5100/openDTU/livedata", "Hello World")
print(res)