// constantes //
const cards = document.getElementById('cards');
const checkFilter = document.getElementById('checkFilter');
const input = document.querySelector('input');

// eventos //
input.addEventListener('input', filtroCruzado);

checkFilter.addEventListener('change', filtroCruzado);

// funciones //
function allEventCard(arrayData) {
  if (arrayData.length == 0) {
    cards.innerHTML = "<h2 class='display-6 fw-bolder text-center'>No match found!</h2>"
    return
  }

  let body = ``;

  arrayData.forEach(events => {
    if (events.date > data.currentDate) {
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
    }
  })

  cards.innerHTML = body;
}

function crearCheckboxes(arrayInfo) {
  let checks = ''
  let categoriasRepetidas = arrayInfo.events.map(elemento => elemento.category)
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

function filtrarPorTexto(arrayDatos, texto) {
  let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltrado
}

function filtrarPorCheck(arrayInfo) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  console.log(checkboxes);
  let arrayChecks = Array.from(checkboxes)
  console.log(arrayChecks);
  let checksChecked = arrayChecks.filter(check => check.checked)
  console.log(checksChecked);
  if (checksChecked.length == 0) {
    return arrayInfo
  }
  let checkValues = checksChecked.map(check => check.value)
  console.log(checkValues);
  let arrayFiltrado = arrayInfo.filter(elemento => checkValues.includes(elemento.category))
  console.log(arrayFiltrado);
  return arrayFiltrado
}

function filtroCruzado() {
  let arrayFiltrado1 = filtrarPorTexto(data.events, input.value)
  let arrayFiltrado2 = filtrarPorCheck(arrayFiltrado1)
  allEventCard(arrayFiltrado2)
}

// llamados //
allEventCard(data.events);
crearCheckboxes(data);
