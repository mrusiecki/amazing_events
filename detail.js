let query = location.search
let params = new URLSearchParams(query)
let id = params.get("id")

let detail = data.events.find(event => event._id == id)

const container = document.getElementById("detail");
let html ='';

html += `
    <div class="row">
        <div class="col-6">
            <img src="${detail.image}" alt="${detail.name}" class="img-fluid float-end">
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