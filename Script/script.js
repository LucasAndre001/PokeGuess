const pokemonImage = document.querySelector('.pokemonImage');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = (pokemon) => {
    fetchPokemon(pokemon).then((data) => {
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    });
}

const resultElement = document.getElementById('result');

renderPokemon('151');