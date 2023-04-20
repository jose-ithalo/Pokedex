const pokeForm = document.querySelector('form');
const inputValue = document.querySelector('#search');
// const inputName = document.querySelector('#name');
// const inputNumber = document.querySelector('#number');
const titleName = document.querySelector('h2');
const valueType = document.querySelector('.valueType');
const pokePhoto = document.querySelector('.front');
const pokePhoto2 = document.querySelector('.back');
const abilities = document.querySelectorAll('.abilities');
const errorBallon = document.querySelector('.errorBallon');
const informations = document.querySelector('.informBallon');
const pokemonImages = document.querySelector('.pokemonImages');
const reverseButton = document.querySelector('.reverseButton');

// const inputList = [inputName, inputNumber];

// inputList.forEach(function (input) {

pokeForm.addEventListener('submit', function (evt) {

    evt.preventDefault();

    const url = 'https://pokeapi.co/api/v2/pokemon/'

    const promiseResposta = fetch(url + inputValue.value.toLowerCase());
    promiseResposta.then(function (resposta) {

        if (!resposta.ok) {
            errorBallon.classList.remove('hidden');
            informations.classList.add('hidden');
            pokemonImages.classList.add('hidden');
            return;
        } else {
            informations.classList.remove('hidden');
            pokemonImages.classList.remove('hidden');
            errorBallon.classList.add('hidden');
        }

        const promiseBody = resposta.json();

        promiseBody.then(function (body) {
            console.log(body);
            titleName.textContent = body.name;
            valueType.textContent = body.types[0].type.name;
            pokePhoto.src = body['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            pokePhoto2.src = body['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];
            inputValue.value = body.name;
            // inputNumber.value = body.id;
            abilities.forEach(function (abil) {
                abil.textContent = '';
            });
            const lengthAbility = body.abilities.length;
            for (let pos = 0; pos < lengthAbility; pos++) {
                abilities[pos].textContent = body.abilities[pos].ability.name;
            }
        });
    });

});
// });

// reverseButton.addEventListener('click', function () {

//     pokePhoto.classList.toggle('hidden');
//     pokePhoto2.classList.toggle('hidden');
// });