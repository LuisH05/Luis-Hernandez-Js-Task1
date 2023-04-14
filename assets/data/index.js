import {creandoEvento, createCheckbox, crossFilter} from "../../script/modules/functions.js"

const $container = document.getElementById('container-card')
const $checkBox = document.getElementById('ckeckBox')
const $search = document.getElementById('busqueda')


let allCarts
const url = 'https://mindhub-xj03.onrender.com/api/amazing'
fetch(url)
    .then(response => response.json())
    .then (datos => {
        allCarts = datos.events.filter(cart => cart.name)
        const listCategory = [...new Set (allCarts.map(cart => cart.category))]
        createCheckbox(listCategory, $checkBox)
        creandoEvento(allCarts, $container)
    })
    .catch(err => console.log(err))

$checkBox.addEventListener('change', () => {
    let checkSelector = [...document.querySelectorAll('input[type = "checkbox"]:checked')].map(check => check.value)

    const cardFilters = crossFilter(allCarts, checkSelector, $search.value)
    creandoEvento(cardFilters, $container)
})

$search.addEventListener('keyup', () => {
    let checkSelector = [...document.querySelectorAll('input[type = "checkbox"]:checked')].map(check => check.value)

    const cardFilters = crossFilter(allCarts, checkSelector, $search.value)
    creandoEvento(cardFilters, $container)
})

