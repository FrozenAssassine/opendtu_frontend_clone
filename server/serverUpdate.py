import time
from datetime import datetime
import requests

time.sleep(2)

max_value_temp = 0
max_value_day = 0
hourCounter = 0 #count every 30 seconds until next hour. Then reset
overall = 0
today = 0
highestTimeTemp = datetime.now().strftime("%H:%M:%S")
highestTime = datetime.now().strftime("%H:%M:%S") #the time where the power was the highest
currentDate = datetime.now().strftime("%d.%m.%Y")
currentDay = datetime.now().strftime("%d")
oldServerData = ''

def custom_print(message_to_print, log_file='output.log'):
    print(message_to_print)
    try:
        with open(log_file, 'a') as of:
            of.write(message_to_print + '\n')
    except:
        print("Error occured while writing to log file")

def checkDataIsFloat(data, valueName):
    try:
        float(data)
        return True
    except ValueError:
        custom_print(f"value {data} is not of type float -> continue anyway ({valueName})")
        return False    

def formatData():
    #OVERALL KWH | TODAY WH | MAXDAY WH | MAXTIME | MAXTEMP |MAXTEMPTIME
    data = f"{overall}|{today}|{max_value_day}|{highestTime}|{max_value_temp}|{highestTimeTemp}"
    
    custom_print(f"{datetime.now().strftime('%d.%m.%Y-%H:%M:%S')} {data}")
    return f"{currentDate}|{data}"

def formatLiveData(livedata):
    p1_current_power = round(livedata["inverters"][0]["DC"]["1"]["Power"]["v"])
    p2_current_power = round(livedata["inverters"][0]["DC"]["2"]["Power"]["v"])
    return f"{overall}|{today}|{currentPower}|{p1_current_power}|{p2_current_power}|{currentTemp}"
    
#upload the live data every 20 seconds to the server
def uploadToServer(livedata):
    try:
        requests.post("https://frozenassassine.de/openDTU/livedata", json=livedata)
    except:
        custom_print("Could not upload live data")
        time.sleep(60)


def uploadHistoryData():
    with open("solar.txt") as f:
        lines = f.readlines()
	
        historyData = "\n".join([line for line in lines if line.strip()])

    if len(historyData) == 0:
        return
    
    try:
        requests.post("https://frozenassassine.de/openDTU/alldata", json={'text': historyData})
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
    

custom_print("-"*50)
custom_print("Started:")

try:
    while True:
        #get the data from the api of OpenDTU
        success, livedata = getlivedata()
        if not success:
            time.sleep(60)
            pass
                
        currenthour = int(datetime.now().strftime("%H"))

        #next day:
        day = datetime.now().strftime("%d")
        if currentDay != day:
            currentDay = day
            max_value_day = 0
            today = 0
            max_value_temp = 0
            
        #night mode:
        if currenthour > 21 or currenthour < 6:
            custom_print(f"{datetime.now().strftime('%H:%M:%S')}: Night mode")
            time.sleep(600) #all 10 minutes
            continue
        
        #get the values from the api
        try:
            currentPower = round(livedata["inverters"][0]["AC"]["0"]["Power DC"]["v"], 1)
            currentTemp = round(livedata['inverters'][0]['INV']['0']['Temperature']['v'], 0)
            overall = round(livedata['total']['YieldTotal']['v'], 1)
            today = round(livedata['total']['YieldDay']['v'], 0)
        except:
            print("Could not get data from api")
            continue

        uploadToServer(livedata)

        #only when the value is an actual float -> current Power
        if checkDataIsFloat(currentPower, "Aktueller Ertrag"):
            currentPower = float(currentPower)
            if currentPower > max_value_day:
                max_value_day = currentPower 
                highestTime = datetime.now().strftime("%H:%M:%S")
        
        #only when the value is an actual float -> current Temperature
        if checkDataIsFloat(currentTemp, "Aktuelle Temperatur"):
            currentTemp = float(currentTemp)
            if currentTemp > max_value_temp:
                max_value_temp = currentTemp 
                highestTimeTemp = datetime.now().strftime("%H:%M:%S")

        hourCounter = hourCounter + 1
        if hourCounter > 6: #6 runs = 180 seconds
            hourCounter = 0 #reset

            #update the current date:
            currentDate = datetime.now().strftime("%d.%m.%Y")

            lines = []
            lastline = ""
            try:
                #check for existing entry:
                with open("solar.txt", "r") as file:
                    lines = file.readlines()
                    if len(lines) > 0:
                        lastline = lines[len(lines)-1]

                if currentDate in lastline: #line exists:
                    lines[len(lines)- 1] = f"{formatData()}\n"
                    with open("solar.txt", "w") as file:
                        file.writelines(lines)
                else:   
                    with open("solar.txt", "a") as file:
                        file.write(f"{formatData()}\n")

                uploadHistoryData()

            except: #write to file error:
                actualTime = datetime.now().strftime("%H:%M:%S")
                custom_print(f"{actualTime}: Error occured while writing to file")
        
        #wait until next check:
        time.sleep(20)

# Close the browser        
except KeyboardInterrupt:
    custom_print("Exit")