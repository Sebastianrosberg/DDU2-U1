// Recommended: All functions declared here

function cityNames() {
    for (let city of cities) {
        let cityContainer = document.getElementById("cities")
        let currentCityName = city.name
        let cityDiv = document.createElement("div")
        cityContainer.appendChild(cityDiv)
        cityDiv.classList.add("cityBox")
        cityDiv.textContent = currentCityName

        // fortsätt här
    }
}

function cityDistances() {
    for (let distance1 of distances) {
        let distanceContainer = document.getElementById("table")
        let currentDistance = distance1.distance
        let distanceCell = document.createElement("div")
        distanceContainer.appendChild(distanceCell)
        distanceCell.classList.add("cell")
        distanceCell.textContent = currentDistance / 10
        // console.log(currentDistance)

        //fortsätt här

    }
}
let userPrompt = prompt("Skriv en stad.")

function cityDistance(userPrompt) {
    for (let city of cities) {
        if (userPrompt == city.name) {
            let city_id = city.id;
            console.log("DEN MATCHAR")
            for (let distance1 of distances) {
                let city_1 = distance1.city1;
                let city_2 = distance1.city2;
                if (city_id == city_1 || city_2 == city_id) {
                    console.log(true)


                }

            }
        }

        /*
            1. Jag har nu city_id:t
            2. Jag måste gå igenom distance
                2.1 Ta ut de objekten som innehåller något om den nuvarande staden
                2.2 Göra något med det.......
        */


    }
}

//om stadens namn går med id i distances så mät avstånd.


cityDistance(userPrompt)
cityNames()
cityDistances()





// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code

