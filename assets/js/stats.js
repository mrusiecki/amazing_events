// constantes //
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let eventsArray = [];
let currentDate = [];

// funciones asincronicas //
async function getEvents() {
    try {
        const response = await fetch(urlApi)
        console.log(response);
        const allData = await response.json()
        console.log(allData.events);
        eventsArray = allData.events;
        currentDate = allData.currentDate;

        tableStats(eventsArray);
    }
    catch (error) {
        console.log(error);
    }

}
// funciones //
function pastEventData(dataArray) {
    let pastEvents = [];

    dataArray.forEach(events => {
        if (events.date < currentDate) {
            let event = {};
            event.id = events._id
            event.assistance = events.assistance
            event.capacity = events.capacity
            event.category = events.category
            event.date = events.date
            event.name = events.name
            event.price = events.price
            event.percentage = (events.assistance * 100) / events.capacity
            event.revenue = events.assistance * events.price;
            pastEvents.push(event)
        };
    })
    return pastEvents;
}

function upcomingEventData(dataArray) {
    let upcomingEvents = [];

    dataArray.forEach(events => {
        if (events.date > currentDate) {
            let event = {};
            event.id = events._id
            event.assistance = events.estimate
            event.capacity = events.capacity
            event.category = events.category
            event.date = events.date
            event.name = events.name
            event.price = events.price
            event.percentage = (events.estimate * 100) / events.capacity
            event.revenue = events.estimate * event.price;
            upcomingEvents.push(event)
        };
    })
    return upcomingEvents;
}

function highPercAtt(dataArray) {
    let pastEvents = pastEventData(dataArray);
    return pastEvents.reduce((acumulador, valorActual) => {
        if (valorActual.percentage > acumulador.percentage) {
            return valorActual;
        } else {
            return acumulador;
        }
    });
}

function lowPercAtt(dataArray) {
    let pastEvents = pastEventData(dataArray);
    return pastEvents.reduce((acumulador, valorActual) => {
        if (valorActual.percentage < acumulador.percentage) {
            return valorActual;
        } else {
            return acumulador;
        }
    });
}

function highCapacityPast(dataArray) {
    let pastEvents = pastEventData(dataArray);
    return pastEvents.reduce((acumulador, valorActual) => {
        if (valorActual.capacity > acumulador.capacity) {
            return valorActual;
        } else {
            return acumulador;
        }
    });
}

function getCategories(dataArray) {
    let categories = [];
    dataArray.forEach(event => {
        if (!categories.includes(event.category)) {
            categories.push(event.category);
        }
    });
    return categories;
}

function getRevenues(category, dataArray) {
    let revenue = 0;
    dataArray.forEach(events => {
        if (events.category == category) {
            revenue += events.revenue;
        };
    });
    return revenue;
}

function getAttendance(category, dataArray) {
    let catTotal = 0;
    let percentage = 0;
    dataArray.forEach(events => {
        if (events.category == category) {
            percentage += events.percentage
            catTotal++;
        };
    });
    if (isNaN(Number.parseFloat(percentage / catTotal).toFixed(2))) {
        return 0;
    }
    else {
        return Number.parseFloat(percentage / catTotal).toFixed(2)
    };
}

function tableStats(dataArray) {
    let firstContainer = document.getElementById("tbody1");
    let secondContainer = document.getElementById("tbody2");
    let thirdContainer = document.getElementById("tbody3");

    let highestAttendance = highPercAtt(dataArray);
    let lowestAttendance = lowPercAtt(dataArray);
    let highCapacityOld = highCapacityPast(dataArray);
    let tableBody1HTML = `<tr>
        <td>${highestAttendance.name} -- ${Number.parseFloat(highestAttendance.percentage).toFixed(2)}%</td>
        <td>${lowestAttendance.name} -- ${Number.parseFloat(lowestAttendance.percentage).toFixed(2)}%</td>
        <td>${highCapacityOld.name} -- ${highCapacityOld.capacity} people</td>
    </tr>`;

    let categories = getCategories(dataArray);

    let tableBody2HTML = "";
    categories.forEach(category => {
        let revenues = getRevenues(category, upcomingEventData(dataArray));
        let attendance = getAttendance(category, upcomingEventData(dataArray));
        tableBody2HTML += `<tr>
        <td>${category}</td>
        <td class="text-end">${revenues}</td>
        <td class="text-end">${attendance} %</td>
    </tr>`;
    })

    let tableBody3HTML = "";
    categories.forEach(category => {
        let revenues = getRevenues(category, pastEventData(dataArray));
        let attendance = getAttendance(category, pastEventData(dataArray));
        tableBody3HTML += `<tr>
        <td>${category}</td>
        <td class="text-end">${revenues}</td>
        <td class="text-end">${attendance} %</td>
    </tr>`;
    })
    firstContainer.innerHTML = tableBody1HTML;
    secondContainer.innerHTML = tableBody2HTML;
    thirdContainer.innerHTML = tableBody3HTML;
}

// llamados //
getEvents();