const inputName = document.querySelector('#name');
const inputNumber = document.querySelector('#number');
const titleName = document.querySelector('h2');
const pokePhoto = document.querySelector('.front');
const pokePhoto2 = document.querySelector('.back');
const abilities = document.querySelectorAll('.abilities');
const popup = document.querySelector('.popup');
const informations = document.querySelector('.inform');


inputName.addEventListener('change', function () {

    const url = 'https://pokeapi.co/api/v2/pokemon/'

    const promiseResposta = fetch(url + inputName.value.toLowerCase());
    promiseResposta.then(function (resposta) {

        if (!resposta.ok) {
            popup.classList.remove('hidden');
            informations.classList.add('hidden');
            return;
        } else {
            informations.classList.remove('hidden');
            popup.classList.add('hidden');
        }

        const promiseBody = resposta.json();

        promiseBody.then(function (body) {
            console.log(body);
            titleName.textContent = body.name;
            pokePhoto.src = body.sprites.front_default;
            pokePhoto2.src = body.sprites.back_default;
            inputNumber.value = body.id;
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

inputNumber.addEventListener('change', function () {
    const url = 'https://pokeapi.co/api/v2/pokemon/'

    const promiseResposta = fetch(url + inputNumber.value);
    promiseResposta.then(function (resposta) {

        if (!resposta.ok) {
            popup.classList.remove('hidden');
            informations.classList.add('hidden');
            return;
        } else {
            informations.classList.remove('hidden');
            popup.classList.add('hidden');
        }

        const promiseBody = resposta.json();

        promiseBody.then(function (body) {
            console.log(body);
            titleName.textContent = body.name;
            pokePhoto.src = body.sprites.front_default;
            pokePhoto2.src = body.sprites.back_default;
            inputName.value = body.name;
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