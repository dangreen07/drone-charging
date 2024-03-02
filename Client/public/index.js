
function createDroneList() {
    fetch("http://localhost:3000/getDrone")
    .then(response => response.json())
    .then(data => {
        var listItem = data["drones"]
        let droneList = document.getElementById("drone-list");
        for (var i = 0; i < listItem.length; i++) {
            var droneItem = document.createElement("li");
            var droneContents = document.createElement("p");
            var item = JSON.parse(listItem[i]);
            droneContents.textContent = item["name"];
            var droneStats = document.createElement("button");
            droneStats.textContent = "Stats";
            var addDrone = document.createElement("button");
            addDrone.textContent = "Add Drone";
            droneItem.appendChild(droneContents);
            droneItem.appendChild(droneStats);
            droneItem.appendChild(addDrone);
            droneList.appendChild(droneItem);
        }
    });
}


document.onload = createDroneList();