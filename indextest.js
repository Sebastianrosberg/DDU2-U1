function cityDistances() {
    for (let city of cities) {
        let cityName = city.name
        let distanceContainer = document.getElementById("table")
        let distanceCell = document.createElement("div");
        distanceContainer.appendChild(distanceCell)
        distanceCell.classList.add("cell")
        distanceCell.textContent = cityName
        for (let distance of distances) {
            // Hitta stad 1 och stad 2 baserat på deras id
            // const city1 = cities.find(city => city.id === distance.city1);
            //const city2 = cities.find(city => city.id === distance.city2);

            // Kontrollera att båda städerna hittas innan vi skriver ut något
            if (distance.city1 === city.id || distance.city2 === city.id) {
                let distanceCell1 = document.createElement("div")
                let mile = distance.distance
                distanceContainer.appendChild(distanceCell1)
                distanceCell1.classList.add("cell")
                distanceCell1.textContent = mile
            }
        }


    }