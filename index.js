function cityNames() {
    for (let city of cities) {
        let cityContainer = document.getElementById("cities");
        let currentCityName = city.name;
        let cityDiv = document.createElement("div");
        cityContainer.appendChild(cityDiv);
        cityDiv.classList.add("cityBox");
        cityDiv.textContent = currentCityName;
        cityDiv.setAttribute("data-id", city.id);
    }
}

function createTable() {
    const tableContainer = document.getElementById("table");

    let rowIndex = -1
    for (let city1 of cities) {
        let colIndex = -1;
        rowIndex++;
        let rowClass = "";

        if (rowIndex % 2 === 0) {
            rowClass = "even_row";
        }
        tableContainer.appendChild(createCell(`${city1.id}-${city1.name}`, "head_column", rowClass));


        for (let city2 of cities) {
            colIndex++;
            let colClass = ""; // Standardvärde

            if (colIndex % 2 === 0) {
                colClass = "even_col"; // Sätt "even_col" för jämna kolumner
            }
            if (city1.id === city2.id) {
                tableContainer.appendChild(createCell("", rowClass, colClass));
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

function createCell(content, className = "", additionalClass = "", additionalClass1 = "") {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (className) cell.classList.add(className);
    if (additionalClass) cell.classList.add(additionalClass);
    if (additionalClass1) cell.classList.add(additionalClass1)
    cell.textContent = content;
    return cell;
}

function headColumn() {
    for (let city of cities) {
        let cityId = city.id;
        let container = document.getElementById("table");
        let currentId = city.id;
        let idCell = document.createElement("div");
        container.appendChild(idCell);
        idCell.classList.add("cell");
        idCell.classList.add("head_column");
        idCell.textContent = " " + currentId;


    }
}

function cityDistance(userPrompt) {
    let found = false;
    let popText = document.querySelector("h2");
    let titleText = document.querySelector("title")

    for (let city of cities) {
        if (userPrompt === city.name) {
            found = true;
            let cityId = city.id;
            let country = city.country;


            popText.textContent = `${userPrompt} (${country})`;
            titleText.textContent = `${userPrompt}`


            textAndColor(cityId);
            return;
        }
    }

    if (!found) {
        popText.textContent = `${userPrompt} finns inte i databasen`;
        titleText.textContent = `Not Found`;
        const h3Element = document.querySelector("h3");
        if (h3Element) {
            h3Element.style.display = "none";
        }

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
    let div = document.createElement("div");
    let distanceContainer = document.getElementById("table");
    distanceContainer.appendChild(div);
    div.classList.add("cell");
}

function textAndColor(cityId) {
    let allCityElements = document.querySelectorAll(".cityBox");
    for (let i = 0; i < allCityElements.length; i++) {
        const element = allCityElements[i];
        element.classList.remove("closest", "furthest");
        element.textContent = element.textContent.replace(/ ligger \d+ mil bort/, "");
    }

    let { closest, farthest } = findCloseAndFar(cityId);


    if (closest) {
        let closestCityElement = document.querySelector(`.cityBox[data-id="${closest.id}"]`);
        if (closestCityElement) {
            closestCityElement.classList.add("closest");
            closestCityElement.textContent += ` ligger ${closest.distance / 10} mil bort`;
        }

        let closestSpan = document.getElementById("closest");
        closestSpan.textContent = closestCityElement.textContent.split(" ligger")[0];
    }

    if (farthest) {
        let furthestCityElement = document.querySelector(`.cityBox[data-id="${farthest.id}"]`);
        if (furthestCityElement) {
            furthestCityElement.classList.add("furthest");
            furthestCityElement.textContent += ` ligger ${farthest.distance / 10} mil bort`;
        }

        let furthestSpan = document.getElementById("furthest");
        furthestSpan.textContent = furthestCityElement.textContent.split(" ligger")[0];
    }
}

function findCloseAndFar(cityId) {
    let closest = null;
    let farthest = null;
    let closestDistance = Infinity;
    let farthestDistance = -Infinity;

    for (let distance of distances) {
        if (distance.city1 === cityId || distance.city2 === cityId) {
            let otherCityId = distance.city1 === cityId ? distance.city2 : distance.city1;

            if (distance.distance < closestDistance) {
                closestDistance = distance.distance;
                closest = { id: otherCityId, distance: closestDistance };
            }

            if (distance.distance > farthestDistance) {
                farthestDistance = distance.distance;
                farthest = { id: otherCityId, distance: farthestDistance };
            }
        }
    }

    return { closest, farthest };
}

cityNames()
emptyDiv()
headColumn()
createTable()
let userPrompt = prompt("Skriv en stad.")
cityDistance(userPrompt)
colorWhenRight(userPrompt)

