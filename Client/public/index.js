
function createDroneList() {
    fetch("http://localhost:3000/getDrone")
    .then(response => response.json())
    .then(data => {
        var listItem = data["drones"]
        let droneList = document.getElementById("drone-list");
        // Loop through drone data for list
        for (var i = 0; i < listItem.length; i++) {
            
            var droneItem = document.createElement("li");
            var droneContents = document.createElement("p");
            let item = JSON.parse(listItem[i]);
            droneContents.textContent = item["name"];

            // Drone stats 
            // TODO: Fix ID bug with onclick function
            let droneStats = document.createElement("button");
            droneStats.textContent = `Stats`;
            droneStats.onclick = function (e, id=item['id']) { location.href=`/stats.html?droneID=${id}`; } ;
            // Create an add drone button
            var addDrone = document.createElement("button");
            addDrone.textContent = "Add Drone";
            // Create drone item for list
            droneItem.appendChild(droneContents);
            droneItem.appendChild(droneStats);
            droneItem.appendChild(addDrone);
            // Add item to list of drones
            droneList.appendChild(droneItem);
        }
    });
}


document.onload = createDroneList();