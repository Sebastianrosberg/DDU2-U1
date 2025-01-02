"use strict"

const citiesDiv = document.getElementById("cities");
let secondHeader = document.querySelector("h2")
let userPrompt = prompt("Hej, skriv sen stad")
const spanFurthest = document.getElementById("furthest")
const spanClosest = document.getElementById("closest")
const table = document.getElementById("table");
const title = document.querySelector("title")


function secondHeaderGetCityName(cityName) {
    for (let city of cities) {

        if (cityName == city.name) {

            secondHeader.textContent = `${city.name} (${city.country})`;
            title.textContent = city.name;
            findClosestAndFurthestCity(cityName)
            return
        }
    }
    title.textContent = "Not found";
    secondHeader.textContent = `${userPrompt} finns inte i databasen`;
    document.querySelector("h3").textContent = "";
}

function findClosestAndFurthestCity(cityName) {
    let furthestDistance = -Infinity;
    let closestDistance = Infinity;
    let furthestCityId = 0;
    let closestCityId = 0;
    let furthestCityName = "";
    let closestCityName = "";

    for (let city of cities) {

        if (cityName == city.name) {

            for (let distance of distances) {

                if (city.id == distance.city1 || city.id == distance.city2) {
                    if (distance.distance > furthestDistance) {
                        furthestDistance = distance.distance;
                        if (city.id == distance.city1) {
                            furthestCityId = distance.city2;

                        } else if (city.id == distance.city2) {
                            furthestCityId = distance.city1;

                        }
                    }
                    if (distance.distance < closestDistance) {
                        closestDistance = distance.distance;
                        if (city.id == distance.city1) {
                            closestCityId = distance.city2;
                        } else if (city.id == distance.city2) {
                            closestCityId = distance.city1;

                        }
                    }
                }
            }
        }
    }

    for (let city of cities) {
        if (furthestCityId == city.id) {
            furthestCityName = city.name
            spanFurthest.textContent = furthestCityName;
        }
        if (closestCityId == city.id) {
            closestCityName = city.name;
            spanClosest.textContent = closestCityName;
        }
    }



    for (let cityDivs of document.querySelectorAll("#cities div")) {
        if (cityDivs.textContent == furthestCityName) {
            cityDivs.classList.add("furthest")
            cityDivs.textContent += ` ligger ${furthestDistance / 10} mil bort`
        }
        if (cityDivs.textContent == closestCityName) {
            cityDivs.classList.add("closest");
            cityDivs.textContent += ` ligger ${closestDistance / 10} mil bort`
        }
        if (cityName == cityDivs.textContent) {
            cityDivs.classList.add("target")
        }
    }
}

// cityBoxes
for (let city of cities) {
    const cityBoxes = document.createElement("div");
    citiesDiv.appendChild(cityBoxes);
    cityBoxes.classList.add("cityBox")
    cityBoxes.textContent = city.name;
}
//


//Table
const emptyDiv = document.createElement("div")
emptyDiv.classList.add("cell")
table.appendChild(emptyDiv)

for (let city of cities) {
    const topRowDivs = document.createElement("div")
    topRowDivs.classList.add("head_row");
    topRowDivs.classList.add("cell");
    topRowDivs.textContent = city.id;
    table.appendChild(topRowDivs);
}

for (let city of cities) {

    const cityNameDiv = document.createElement("div");
    cityNameDiv.classList.add("head_column");
    cityNameDiv.classList.add("cell")
    table.appendChild(cityNameDiv);
    cityNameDiv.textContent = `${city.id}-${city.name}`;
    if (city.id % 2 == 0) {
        cityNameDiv.classList.add("even_row")
    }

    for (let compareCity of cities) {

        if (city.id == compareCity.id) {
            const tableEmptyDiv = document.createElement("div")
            tableEmptyDiv.classList.add("cell")
            table.appendChild(tableEmptyDiv)
            if (compareCity.id % 2 == 0) {
                tableEmptyDiv.classList.add("even_col")
            }
            if (city.id % 2 == 0) {
                tableEmptyDiv.classList.add("even_row")
            }
        }

        for (let distance of distances) {
            if (city.id == distance.city1 && compareCity.id == distance.city2
                || compareCity.id == distance.city1 && city.id == distance.city2) {
                const distanceDivs = document.createElement("div");
                distanceDivs.classList.add("cell");
                table.appendChild(distanceDivs);
                distanceDivs.textContent = distance.distance / 10;
                if (compareCity.id % 2 == 0) {
                    distanceDivs.classList.add("even_col")
                }
                if (city.id % 2 == 0) {
                    distanceDivs.classList.add("even_row")
                }
            }
        }
    }
}

//Funktions anrop
secondHeaderGetCityName(userPrompt)