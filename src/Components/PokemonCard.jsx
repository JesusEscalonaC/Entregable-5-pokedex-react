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
    const getTypesCard = () =>{
       return pokemon.types?.[0].type.name
    }
    console.log(pokemon)
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
        <div className= {`pokeball__card ${getTypesCard()}`} >
        <img className='pokedex-img' src={pokemon.sprites?.other.dream_world.front_default} alt="" />
        <h2 className='card-title'>{pokemon.name?.toUpperCase()}</h2> 
        <h4 className='card-subtitle'>
          Types: 
          {
            getTypes()
          }
        </h4 >

        <div className='card-text-container'>
        <h4 className='card-text'>
         HP: { pokemon.stats?.[0].base_stat }
        </h4 >

        <h4 className='card-text'>
          ATTACK: { pokemon.stats?.[1].base_stat}
        </h4 >

        <h4 className='card-text'>
          DEFENSE: { pokemon.stats?.[2].base_stat }
        </h4 >

        <h4 className='card-text'>
          SPEED: { pokemon.stats?.[5].base_stat }
        </h4 >
        </div>
        </div>
      </div>
    </div>

    );
};

export default PokemonCard;