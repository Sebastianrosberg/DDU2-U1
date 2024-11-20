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

    let rowIndex = -1
    for (let city1 of cities) {
        rowIndex++;
        const rowClass = rowIndex % 2 === 0 ? "even_row" : "";
        console.log(rowClass)
        tableContainer.appendChild(createCell(`${city1.id}-${city1.name}`, "head_column", rowClass));


        for (let city2 of cities) {

            if (city1.id === city2.id) {
                tableContainer.appendChild(createCell("", "", rowClass));
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


                tableContainer.appendChild(createCell(distance, "", rowClass));
            }
        }
    }
}

// Funktion för att skapa en cell
function createCell(content, className = "", additionalClass = "") {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (className) cell.classList.add(className);
    if (additionalClass) cell.classList.add(additionalClass)
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



let userPrompt = prompt("Skriv en stad.")

function cityDistance(userPrompt) {
    let found = false;
    let popText = document.querySelector("h2")
    for (let city of cities) {
        if (userPrompt == city.name) {
            found = true
            let city_id = city.id;
            let country = city.country
            let cityName = city.name
            //console.log("DEN MATCHAR")
            for (let distance1 of distances) {
                let city_1 = distance1.city1;
                let city_2 = distance1.city2;
                if (city_id == city_1 || city_2 == city_id) {
                    // kk

                    popText.textContent = userPrompt + " " + "(" + (country) + ")"
                    return


                    //De namn som matchar ska bli svart, de städer som ligger längst ifrån och närmast ska bli en annan färg. 
                    //Text till h2 måste göras i Else sats
                    /*
                        1. Jag har nu city_id:t
                        2. Jag måste gå igenom distance
                            2.1 Ta ut de objekten som innehåller något om den nuvarande staden
                            2.2 Göra något med det.......
                    */
                }

            }
        }
    }
    if (!found) {
        popText.textContent = userPrompt + " finns inte i databasen";
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




//om stadens namn går med id i distances så mät avstånd.

emptyDiv()
cityDistance(userPrompt)
headColumn()
createTable()
cityNames()
colorWhenRight(userPrompt)





// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code
