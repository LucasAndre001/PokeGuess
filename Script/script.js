const pokemonImage = document.getElementById('pokemonImage');
const resultElement = document.getElementById('result');
const optionsContainer = document.getElementById('options');
const pointsElement = document.getElementById('pointsValue');
const mistakesElement = document.getElementById('mistakesValue');

let usedPokemonIds = [];
let points = 0;
let mistakes = 0;

const fetchPokemonById = async (id) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = (id) => {
    fetchPokemonById(id).then((data) => {
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    });
}

const loadQuestionWithOptions = async () => {
    let pokemonId = getRandomPokemonId();

    while (usedPokemonIds.includes(pokemonId)) {
        pokemonId = getRandomPokemonId();
    }

    usedPokemonIds.push(pokemonId);
    const pokemon = await fetchPokemonById(pokemonId);

    const options = [pokemon['name']];
    const optionsIds = [pokemonId];

    while (options.length < 4) {
        let randomPokemonId = getRandomPokemonId();

        while (optionsIds.includes(randomPokemonId)) {
            randomPokemonId = getRandomPokemonId();
        }
        optionsIds.push(randomPokemonId);

        const randomPokemon = await fetchPokemonById(randomPokemonId);
        const randomOption = randomPokemon['name'];
        options.push(randomOption);
    }

    shuffleArray(options);

    resultElement.innerHTML = 'Quem é esse <br> Pokemon?';
    pokemonImage.src = pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    optionsContainer.innerHTML = ''; // Limpa os botões anteriores
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = (event) => checkAnswer(option === pokemon.name, event);
        optionsContainer.appendChild(button);
    });
};

loadQuestionWithOptions();

function checkAnswer(isCorrect, event) {
    const selectedButton = document.querySelector('.selected');
    if (selectedButton) {
        return;
    }

    event.target.classList.add('selected');
    if (isCorrect) {
        displayResult('Certa resposta!');
        points++;
        pointsElement.textContent = points;
        event.target.classList.add('correct');
    } else {
        displayResult('Resposta errada!');
        mistakes++;
        mistakesElement.textContent = mistakes;
        event.target.classList.add('incorrect');
    }

    setTimeout(() => {
        loadQuestionWithOptions();
    }, 1000);
}

function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function displayResult(result) {
    resultElement.textContent = result;
}
