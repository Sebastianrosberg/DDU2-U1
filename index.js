// Recommended: All functions declared here

function cityNames() {
    for (let city of cities) {
        let cityContainer = document.getElementById("cities")
        let currentCityName = city.name
        let cityDiv = document.createElement("div")
        cityContainer.appendChild(cityDiv)
        cityDiv.classList.add("cityBox")
        cityDiv.textContent = currentCityName
        cityDiv.setAttribute("data-id", city.id);
        // fortsätt här
    }
}

function createTable() {
    const tableContainer = document.getElementById("table");
    let colIndex = -1
    let rowIndex = -1
    for (let city1 of cities) {
        let colIndex = -1
        rowIndex++;
        const rowClass = rowIndex % 2 === 0 ? "even_row" : "";
        console.log(rowClass)
        tableContainer.appendChild(createCell(`${city1.id}-${city1.name}`, "head_column", rowClass));


        for (let city2 of cities) {
            colIndex++
            const colClass = colIndex % 2 === 0 ? "even_col" : "";
            if (city1.id === city2.id) {
                tableContainer.appendChild(createCell("", "", rowClass, colClass));
            } else {

                let distanceObj = null;

                for (let d of distances) {
                    if ((d.city1 === city1.id && d.city2 === city2.id) ||
                        (d.city1 === city2.id && d.city2 === city1.id)) {
                        distanceObj = d;
                        break;
                    }


                }

                let distance;

                if (distanceObj) {
                    distance = `${distanceObj.distance / 10}`;
                }


                tableContainer.appendChild(createCell(distance, "", rowClass, colClass));
            }
        }
    }
}

// Funktion för att skapa en cell
function createCell(content, className = "", additionalClass = "", additionalClass1 = "") {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (className) cell.classList.add(className);
    if (additionalClass) cell.classList.add(additionalClass);
    if (additionalClass1) cell.classList.add(additionalClass1)
    cell.textContent = content;
    return cell;
}







/*
    1. Jag går igenom en stad i taget.
    2. Namnen behöver finnas först
    3. Identifiera vilken kolumn som ska vara tom (använda id? använda index?)
    4. Jag behöver gå igenom avstånden.
        4.1 Identifiera var stadens id finns i distances
        4.2 Om den finns i någon av dem, så behöver jag sätta in i rätt kolumn. 
 
*/





// distanceContainer.appendChild(distanceCell)
// distanceCell.classList.add("cell")
// distanceCell.textContent = currentDistance / 10
// //console.log(currentDistance)

// //komma åt city id 
// //fortsätt här
// for (let city of cities) {
//     let cityid = city.id;
//     if (cityid % 2 == 0) {
//         console.log(`City ID ${cityid} är jämnt`);
//         distanceCell.classList.add("even_co");
//     }
// }



function headColumn() {
    for (let city of cities) {
        let cityId = city.id
        //console.log(cityId)
        let container = document.getElementById("table")
        let currentId = city.id
        let idCell = document.createElement("div")
        container.appendChild(idCell)
        idCell.classList.add("cell")
        idCell.classList.add("head_column")
        idCell.textContent = " " + currentId
        // Saknar en tom cell annars är denna funktionen klar. Tror jag.

    }
}




function cityDistance(userPrompt) {
    let found = false; // Används för att kontrollera om staden hittades
    let popText = document.querySelector("h2");

    for (let city of cities) {
        if (userPrompt === city.name) {
            found = true; // Staden hittades
            let cityId = city.id;
            let country = city.country;

            // Visa information om staden
            popText.textContent = `${userPrompt} (${country})`;

            // Färga närmaste och längsta städer
            highlightClosestAndFarthest(cityId);
            return; // Avsluta funktionen när staden hittas
        }
    }

    // Om staden inte hittades, visa felmeddelande
    if (!found) {
        popText.textContent = `${userPrompt} finns inte i databasen`;
    }
}

function colorWhenRight(userPrompt) {
    for (let city of cities) {
        if (userPrompt == city.name) {
            let cityElement = document.querySelector(`.cityBox[data-id="${city.id}"]`);
            if (cityElement) {
                cityElement.classList.add("target");
            }
        }
    }
}

function emptyDiv() {
    let div = document.createElement("div")
    let distanceContainer = document.getElementById("table")
    distanceContainer.appendChild(div)
    div.classList.add("cell")
}


// Här ör ny kod

function highlightClosestAndFarthest(cityId) {
    // Rensa tidigare markeringar
    const allCityElements = document.querySelectorAll(".cityBox");
    for (let i = 0; i < allCityElements.length; i++) {
        const element = allCityElements[i];
        element.classList.remove("closest", "furthest");
        element.textContent = element.textContent.replace(/ ligger \d+ mil bort/, ""); // Ta bort avståndstext
    }

    // Hitta närmaste och längsta städer
    const { closest, farthest } = findClosestAndFarthestCity(cityId);

    // Färga och uppdatera text för den närmaste staden
    if (closest) {
        const closestCityElement = document.querySelector(`.cityBox[data-id="${closest.id}"]`);
        if (closestCityElement) {
            closestCityElement.classList.add("closest");
            closestCityElement.textContent += ` ligger ${closest.distance / 10} mil bort`;
        }
    }

    // Färga och uppdatera text för den längsta staden
    if (farthest) {
        const furthestCityElement = document.querySelector(`.cityBox[data-id="${farthest.id}"]`);
        if (furthestCityElement) {
            furthestCityElement.classList.add("furthest");
            furthestCityElement.textContent += ` ligger ${farthest.distance / 10} mil bort`;
        }
    }
}



function findClosestAndFarthestCity(cityId) {
    let closest = null;
    let farthest = null;
    let closestDistance = Infinity;
    let farthestDistance = -Infinity;

    for (let distance of distances) {
        if (distance.city1 === cityId || distance.city2 === cityId) {
            const otherCityId = distance.city1 === cityId ? distance.city2 : distance.city1;

            // Uppdatera närmaste stad
            if (distance.distance < closestDistance) {
                closestDistance = distance.distance;
                closest = { id: otherCityId, distance: closestDistance };
            }

            // Uppdatera längsta stad
            if (distance.distance > farthestDistance) {
                farthestDistance = distance.distance;
                farthest = { id: otherCityId, distance: farthestDistance };
            }
        }
    }

    return { closest, farthest };
}





























//om stadens namn går med id i distances så mät avstånd.
cityNames()
emptyDiv()
headColumn()
createTable()
let userPrompt = prompt("Skriv en stad.")
cityDistance(userPrompt)
colorWhenRight(userPrompt)
titleDecider(userPrompt)





// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code
