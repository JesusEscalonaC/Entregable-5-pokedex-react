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
  const [ page, setPage ] = useState(1);


  const navigate = useNavigate();
  const allPokemons = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154';

  useEffect(() => {
    axios
      .get(allPokemons)
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
      .then(res => { setPokemon(res.data.pokemon ? res.data.pokemon : res.data.results ); setPage(1) } )
  }

  const pokemonsPerPage = 8;
  const lastIndexPokemon = page * pokemonsPerPage;
  const firstIndexPokemon = lastIndexPokemon - pokemonsPerPage;
  const pokemonPaginated =  pokemon.slice(firstIndexPokemon , lastIndexPokemon);
  const totalPages = Math.ceil(pokemon.length/pokemonsPerPage);
  const numbersTotalPages = [];
  for(let i=1; i <= totalPages; i++){
    numbersTotalPages.push(i)
  }
  

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
          pokemonPaginated.map(pokemon => (
            <PokemonCard
              key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
              url={pokemon.url ? pokemon.url : pokemon.pokemon.url} />
          ))
        }
      </div>

      <div className='button-pages-container' >
        <button onClick={() => setPage(page-1)} disabled={page==1} >Previous page</button>
        
        
        <ul>
        <div className='buttons-numbers'>
          {
            numbersTotalPages.map(numberButton => (
              <li key={`${numberButton}`} onClick={() => setPage(numberButton)} className={page == numberButton ? 'select-button' : 'button-select'} >{numberButton}</li>
            ))
          }
          </div>
        </ul>
       
        <button onClick={() => setPage(page+1)} disabled={page==totalPages} >Next page</button>
      </div>

    </div>
  );
};

export default Pokedex;