import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/stylePokeBall.css'
import arriba from '../assets/pokeball arriba.png'
import medio from '../assets/pokeball medio.png'
import abajo from '../assets/pokeball abajo.png'

const PokemonCard = ({url}) => {
    const [pokemon, setPokemon] = useState({})
    useEffect(()=>{
        axios
        .get(url)
        .then(res => setPokemon(res.data))
    },[])
    console.log(pokemon)
    const getTypes = () =>{
        return pokemon.types?.map( type => " "+type.type.name)
      }
    return (
       
        <div className="pokemon">
      <div className="container__pokeball animate__animated animate__bounce">
        <Link  to = {`/pokedex/${pokemon.id}`} className="pokebal false">
          <div className="pokeball__top">
            <img src={arriba} className="pokeball__img1" alt="" />
            <div className="pokeball__med">
              <img src={medio} className="pokeball__img2" alt="" />
              <div className="pokeball__circle"></div>
            </div>
          </div>
          <div className="pokeball__down">
            <img src={abajo} className="pokeball__img3" alt="" />
          </div>
        </Link>
        <div class="pokeball__card" >
        <h2 className='card-title'>{pokemon.name}</h2> 
        <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />
        <h4 className='card-text'>
          Types: 
          {
            getTypes()
          }
        </h4 >

        <h4 className='card-text'>
          Hp: { pokemon.stats?.[0].base_stat }
        </h4 >

        <h4 className='card-text'>
          Attack: { pokemon.stats?.[1].base_stat }
        </h4 >

        <h4 className='card-text'>
          Defense: { pokemon.stats?.[2].base_stat }
        </h4 >

        <h4 className='card-text'>
          Speed: { pokemon.stats?.[5].base_stat }
        </h4 >
        </div>
      </div>
    </div>

    );
};

export default PokemonCard;