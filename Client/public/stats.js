function getDroneStats() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const droneID = urlParams.get("droneID");
    fetch("http://localhost:3000/getDrone")
    .then(response => response.json())
    .then(data => {
        var listItem = data["drones"]
        for (var i = 0; i < listItem.length; i++) {
            let item = JSON.parse(listItem[i]);
            if(item["id"] == droneID) {
                let droneLocation = document.getElementById("location-data");
                let droneCharge = document.getElementById("charge");
                let droneSpeed = document.getElementById("speed");
                droneLocation = data["location"];
                droneCharge = data["charge"];
                droneSpeed = data["speed"];
            }
        }
    });
}