const pokeForm = document.querySelector('form');
const inputValue = document.querySelector('#search');
const titleName = document.querySelector('h2');
const valueType = document.querySelector('.valueType');
const pokePhoto = document.querySelector('.front');
const pokePhoto2 = document.querySelector('.back');
const abilities = document.querySelectorAll('.abilities');
const errorBallon = document.querySelector('.errorBallon');
const informations = document.querySelector('.informBallon');
const pokemonImages = document.querySelector('.pokemonImages');
const reverseButton = document.querySelector('.reverseButton');
const buttonPrev = document.querySelector('.btnPrev');
const buttonNext = document.querySelector('.btnNext');

const url = 'https://pokeapi.co/api/v2/pokemon/';
let pokeNumber = 0;

function renderPokemon(response) {

    if (!response.ok) {
        errorBallon.classList.remove('hidden');
        informations.classList.add('hidden');
        pokemonImages.classList.add('hidden');
        return;
    } else {
        informations.classList.remove('hidden');
        pokemonImages.classList.remove('hidden');
        errorBallon.classList.add('hidden');
    }

    const promiseBody = response.json();

    promiseBody.then(function (body) {
        console.log(body);
        titleName.textContent = body.name;
        valueType.textContent = body.types[0].type.name;
        pokePhoto.src = body['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokePhoto2.src = body['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];
        inputValue.value = body.name;
        pokeNumber = body.id;
        // inputNumber.value = body.id;
        abilities.forEach(function (abil) {
            abil.textContent = '';
        });
        const lengthAbility = body.abilities.length;
        for (let pos = 0; pos < lengthAbility; pos++) {
            abilities[pos].textContent = body.abilities[pos].ability.name;
        }
    });
}

pokeForm.addEventListener('submit', function (evt) {

    evt.preventDefault();

    const promiseResponse = fetch(url + inputValue.value.toLowerCase());
    promiseResponse.then(function (response) {
        renderPokemon(response);
    });

});

buttonPrev.addEventListener('click', function () {

    if (pokeNumber <= 1) {
        return
    }

    pokeNumber -= 1;

    const promiseResponse = fetch(url + pokeNumber);
    promiseResponse.then(function (response) {
        renderPokemon(response);
    });
});

buttonNext.addEventListener('click', function () {

    pokeNumber += 1;

    const promiseResponse = fetch(url + pokeNumber);
    promiseResponse.then(function (response) {
        renderPokemon(response);
    });
});

reverseButton.addEventListener('click', function () {
    pokePhoto.classList.toggle('hidden');
    pokePhoto2.classList.toggle('hidden');
});