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

  const getTypes = () => {
    return pokemon.types?.map(type => " " + type.type.name)
  }

  const stats = pokemon.stats?.filter(stat => stat.stat.name == 'hp' || stat.stat.name == 'attack' || stat.stat.name == 'defense' || stat.stat.name == 'speed')

  console.log(stats)

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

            {
              stats?.map((stat, index) => (
                <div className='pokemon-progress-container' key={index}>
                  <h4>
                    {stat.stat.name}: {stat.base_stat}
                  </h4 >
                  <div className='bar'>
                    <div
                      className='progress'
                      style={{ width: `${stat.base_stat}%  `, animation: `progres${index} 4s linear` }}
                    >
                      <style>
                        {`
                          @keyframes progres${index} {
                            0%{
                              width: 0;
                            }
                          
                            100%{
                              width:${stats.base_stat}%
                            }
                          }
                        `}
                      </style>
                    </div>
                  </div>
                </div>
              ))
            }


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