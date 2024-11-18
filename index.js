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
    for (let distance of distances) {
        console.log(distance)
        let distanceContainer = document.getElementById("")

    }
}

cityNames()
cityDistances()





// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code

