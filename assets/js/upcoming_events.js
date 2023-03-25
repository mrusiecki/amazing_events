// constantes //
const cards = document.getElementById('cards');
const checkFilter = document.getElementById('checkFilter');
const input = document.querySelector('input');
const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

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

    allEventCard(eventsArray);
    crearCheckboxes(eventsArray);
  }
  catch (error) {
    console.log(error);
  }

}

// eventos //
input.addEventListener('input', () => {
  renderSearch();
});

checkFilter.addEventListener('change', renderSearch);

// funciones //
function allEventCard(dataArray) {
  let cardsDate = [];

  dataArray.forEach(events => {
    if (events.date > currentDate) {
      cardsDate.push(events)
    };
  })

  if (cardsDate.length == 0) {
    cards.innerHTML = "<h2 class='display-6 fw-bolder text-center'>No match found!</h2>"
    return
  }
  let body = ``;

  cardsDate.forEach(events => {
    body += `
          <div class="card" style="width: 18rem;">
          <div class="card-body">
              <img src=${events.image} class="card-img-top" alt=${events.name}>
              <h5 class="card-title">${events.name}</h5>
              <p class="card-text">${events.description}</p>
              <p class="card-text"><small class="text-muted">Category: ${events.category}</small></p>
              <p class="card-text"><small class="text-muted">Price: $${events.price}</small></p>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
               <a href="./detail.html?id=${events._id}" class="btn btn-primary">Details</a></div>
              </div>
          </div>
          `;
  })

  cards.innerHTML = body;
}

function crearCheckboxes(dataArray) {
  let checks = ''
  let categoriasRepetidas = dataArray.map(elemento => elemento.category)
  let clases = new Set(categoriasRepetidas.sort((a, b) => {
    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }
    return 0
  }))
  clases.forEach(elemento => {
    checks += `<div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" role="switch" id="${elemento}" value="${elemento}">
      <label class="form-check-label" for="${elemento}">${elemento}</label>
    </div>`
  })
  checkFilter.innerHTML = checks
}

function filtrarPorTexto(eventsArray, texto) {
  let arrayFiltrado = eventsArray.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltrado
}

function filtrarPorCheck() {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let check = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      check.push(checkbox.value);
    }
  });
  return check;
}

function renderSearch() {
  let textoBusqueda = input.value;
  let tiposChequeados = filtrarPorCheck();
  let resultados = eventsArray.filter(event => event.name.toLowerCase().includes(textoBusqueda.toLowerCase()));
  if (tiposChequeados.length > 0) {
    resultados = resultados.filter(events => {
      return tiposChequeados.some(tipo => events.category.includes(tipo));
    });
  }
  allEventCard(resultados);
}

// llamados //
getEvents();