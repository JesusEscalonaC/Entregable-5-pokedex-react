import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { changeName } from './store/slices/name.slice';

const InputName = () => {
    const [pokeName, setPokeName] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const enterName = () => {
        dispatch(changeName(pokeName))
        navigate("/pokedex");
  };

    return (
        <div className='container-page'>
            <div className='sky-container'>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
            </div>
            <div className='first-page'>
            <img className='first-page-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
            <h2 className='first-page-subtitle'>Welcome Master!</h2>
            <p className='first-page-text'>Give your name to see the pokedex</p>
            <form className='first-page-form'>
            <input
             className='first-page-input'
             type="text"
             placeholder='Enter your name'
             onChange={(e)=> setPokeName(e.target.value)}
             value = {pokeName}
             />
            <button className='first-page-button' onClick={enterName}>Catch them all</button>
            </form>
            </div>
        </div>
    );
};

export default InputName;