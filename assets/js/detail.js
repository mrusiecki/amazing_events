// constantes //
let query = location.search
let params = new URLSearchParams(query)
let id = params.get("id")
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let detail = []

// funciones asincronicas //
async function getEvents() {
    try {
        const response = await fetch(urlApi)
        console.log(response);
        const allData = await response.json()
        console.log(allData.events);
        eventsArray = allData.events;
        
        detail = eventsArray.find(event => event._id == id);
        const container = document.getElementById("detail");
        let html = '';

        html += `
    <div class="row">
        <div class="col-6">
            <img src="${detail.image}" alt="${detail.name}" class="img-fluid img-thumbnail float-end">
        </div>
        <div class="col-6">
            <h5>Name: ${detail.name}</h5>
            <h5>Date: ${detail.date}</h5>
            <h5>Description: ${detail.description}</h5>
            <h5>Place: ${detail.place}</h5>
            <h5>Capacity: ${detail.capacity}</h5>
            <h5>Assistance or estimate: ${detail.assistance}</h5>
            <h5>Price: $${detail.price}</h5>
        </div>
    </div>
`

        container.innerHTML = html;
    }
    catch (error) {
        console.log(error);
    }

}

// llamados //
getEvents();
