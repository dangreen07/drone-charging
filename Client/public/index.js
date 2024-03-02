
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
            console.log(item["id"]);

            // Drone stats 
            // TODO: Fix ID bug with onclick function
            let droneStats = document.createElement("button");
            droneStats.textContent = `Stats`;
            droneStats.onclick = function (e, id=item['id']) { location.href=`/stats.html?droneID=${id}`; } ;

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