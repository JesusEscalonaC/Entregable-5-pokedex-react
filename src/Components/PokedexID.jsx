import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokedexID = () => {
  const [pokemon, setPokemon] = useState({});

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => setPokemon(res.data))
  }, [])

  const getTypes = () =>{
    return pokemon.types?.map( type => " "+type.type.name)
  }

  // console.log(pokemon)
  
  return (
    <div className='pokedex-id'>
      <div className='pokemon-detail-container' >
        <h2>{pokemon.name}</h2>
        <div className="pokemon-detail">

            
            <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />

            <div className='abilites' >
              <h3>Abilities</h3>
              <ul>
                {pokemon.abilities?.map(ability => (
                  <li key={ability.ability.name} >{ability.ability.name}</li>
                ))
                }
              </ul>
            </div>

            
            <div className='pokemon-detail-text' >

              <h4>
                Types:
                {
                  getTypes()
                }
              </h4 >

              <h4>
                Hp: {pokemon.stats?.[0].base_stat}
              </h4 >

              <h4>
                Attack: {pokemon.stats?.[1].base_stat}
              </h4 >

              <h4>
                Defense: {pokemon.stats?.[2].base_stat}
              </h4 >

              <h4>
                Speed: {pokemon.stats?.[5].base_stat}
              </h4 >

            </div>

        </div>

      </div>
      
      <div className='list-moves-container'>
        <h2>Moves</h2>
        <ul className='list-moves' >
          {pokemon.moves?.map(move => (
              <li key={move.move.name} >{move.move.name}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default PokedexID;