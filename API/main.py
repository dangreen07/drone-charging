from flask import Flask, jsonify, request
from threading import Thread
import time
import json

## Class for drones
class Drone:
    location = (0,0) ## Location of drone
    charge = 100 ## 100% charge
    chargeLostPerMeter = 0.25 ## 0.25% loss
    speed = 20 ## Meters per second
    def __init__(self, name: str) -> None:
        self.name = name ## Drone name setting
    def convertToJson(self) -> str:
        data = {
            "location": self.location,
            "charge": self.charge,
            "chargeLostPerMeter": self.chargeLostPerMeter,
            "speed": self.speed
        }
        return json.dumps(data, indent=4)

app = Flask(__name__)

# Sample data for drones
drones = [
    Drone("Drone 1"),
    Drone("Drone 2")
]

# GET endpoint to retrieve drone information
@app.route('/getDrone', methods=['GET'])
def get_drone():
    return jsonify({"drones": [i.convertToJson() for i in drones]})

# POST endpoint to add a new drone
@app.route('/addDrone', methods=['POST'])
def add_drone():
    if request.is_json:
        data = request.get_json()
        new_drone  = Drone(data.get("name"))
        drones.append(new_drone)
        return jsonify({"message": "Drone added successfully", "drone": new_drone}), 201
    else:
        return jsonify({"error": "Invalid JSON format"}), 400

## Drone simulation
def refresh():
    lastTime = time.time_ns()
    while True:
        delta = time.time_ns() - lastTime
        for drone in drones:
            drone.charge -= drone.speed * drone.chargeLostPerMeter * delta * pow(10,-9)
        lastTime = time.time_ns()

def startRefreshThread():
    refreshThread = Thread(target=refresh,daemon=True)
    time.sleep(3)
    refreshThread.start()

if __name__ == '__main__':
    startRefreshThread()
    app.run(port=3000, debug=True)
