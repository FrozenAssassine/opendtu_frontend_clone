import time
from datetime import datetime
import requests
import json

time.sleep(2)

def custom_print(message_to_print, log_file='output.log'):
    print(message_to_print)
    try:
        with open(log_file, 'a') as of:
            of.write(message_to_print + '\n')
    except:
        print("Error occured while writing to log file")
    
#upload the live data every 20 seconds to the server
def uploadToServer(livedata):
    try:
        headers = {'Content-Type': 'application/json'}
        requests.post("https://frozenassassine.de/openDTU/livedata", json=livedata, headers=headers)
    except:
        custom_print("Could not upload live data")
        time.sleep(60)

def getlivedata():
    try:
        res = requests.get('http://192.168.5.150/api/livedata/status')
        if res.status_code != 200:
            print("Could not get data from API: " + res.status_code)
        return (res.status_code == 200, res.json())
    except:
        return (False, "")

try:
    while True:

        #get the data from the api of OpenDTU
        success, livedata = getlivedata()
        if not success:
            time.sleep(60)
            pass
                
        currenthour = int(datetime.now().strftime("%H"))

        #night mode:
        if currenthour > 21 or currenthour < 6:
            custom_print(f"{datetime.now().strftime('%H:%M:%S')}: Night mode")
            time.sleep(600) #all 10 minutes
            continue
        
        uploadToServer(livedata)

        #wait until next check:
        time.sleep(20)

#exit the upload script
except KeyboardInterrupt:
    custom_print("Exit")