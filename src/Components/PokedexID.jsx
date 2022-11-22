import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokedexID = () => {
    const [pokemon, setPokemon] = useState({});
    
    const {id} = useParams();
    useEffect(() =>{
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => setPokemon(res.data))
    },[])
    return (
        <div>
            <h1>Pokedex ID</h1>
            <h2>{pokemon.name}</h2>
            <img style={{height: "100px",width: "100px" }} src={pokemon.sprites?.other.dream_world.front_default} alt="" />
        </div>
    );
};

export default PokedexID;