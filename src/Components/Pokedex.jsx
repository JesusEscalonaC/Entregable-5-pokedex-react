import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const Pokedex = () => {
  const pokeName = useSelector(state => state.name)
  const [pokemon, setPokemon] = useState([])
  const [pokemonName, setPokemonName] = useState("")
  const [pokeTypes, setPokeTypes] = useState([])

  const navigate = useNavigate();
  const allPokemons = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then(res => setPokemon(res.data.results))

    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then(res => setPokeTypes(res.data.results))
  }, [])
  // console.log(pokeTypes)

  const searchPokemon = () => {
    navigate(`/pokedex/${pokemonName.toLowerCase()}`)
  }

  const filterType = (e) => {
    const url = e.target.value;
    axios
      .get(url)
      .then(res => setPokemon(res.data.pokemon ? res.data.pokemon : res.data.results ))
  }

  console.log(pokemon)

  return (
    <div className='pokedex'>
      <h2>Welcome {pokeName}! </h2>

      <div className='search-or-select-pokemon' >
        
        <input className='search-or-select-pokemon-input' type="text" placeholder='insert pokemon' onChange={(e) => setPokemonName(e.target.value)} />
        <button onClick={searchPokemon}>search</button>
        <select className='search-or-select-pokemon-select' onChange={filterType} name="" id="">
          <option value={allPokemons}>All pokemon</option>
          {pokeTypes.map((type) => (
            <option key={type.name} value={type.url}>
              {type.name}
            </option>
          ))}

        </select>
        
      </div>

      <div className='pokeball-container'>
        {
          pokemon.map(pokemon => (
            <PokemonCard
              key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
              url={pokemon.url ? pokemon.url : pokemon.pokemon.url} />
          ))
        }
      </div>
    </div>
  );
};

export default Pokedex;