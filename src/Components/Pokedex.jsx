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

    useEffect(()=>{
        axios
        .get("https://pokeapi.co/api/v2/pokemon/")
        .then(res => setPokemon(res.data.results))

        axios
        .get("https://pokeapi.co/api/v2/type/")
        .then(res => setPokeTypes(res.data.results))
    }, [])
    // console.log(pokeTypes)

    const searchPokemon = () =>{
        navigate(`/pokedex/${pokemonName.toLowerCase()}`)
    }
    const filterType = (e) =>{
       const url = e.target.value;
       axios
       .get(url)
       .then((res) => setPokemon(res.data.pokemon))
    }
    return (
        <div>
            <h1>Pokedex</h1>
            <h2>Welcome {pokeName}! </h2>
            <input type="text" placeholder='insert pokemon' onChange={(e) => setPokemonName(e.target.value)} />
            <button onClick={searchPokemon}>search</button>
            <select onChange={filterType} name="" id="">

            {pokeTypes.map((type) => (
            <option key={type.name} value={type.url}>
                {type.name}
            </option>
          ))}

            </select>
            <div className='pokeball-container'>
            {
                pokemon.map(pokemon =>(
                    <PokemonCard 
                     key = {pokemon.name}
                     url = {pokemon.url ? pokemon.url : pokemon.pokemon.url} />
                ))
            }
            </div>
        </div>
    );
};

export default Pokedex;