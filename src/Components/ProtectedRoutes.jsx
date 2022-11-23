import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import pokedexTitle from '../assets/titlePokedexFigma.svg'
import '../assets/poke-ball.css'

const ProtectedRoutes = () => {

    const pokeName = useSelector(state => state.name)
		// Aquí va la condición. Puede ser una condición de cualquier tipo. Lo que 
		// Importa es que valide si el usuario está loggeado o no
    if(pokeName){
      return  <>
      <div>
        <div className='rectangle-red' ></div>
        <div className='rectangle-black'>

          <div className='pokeball poke-ball-right'>
            <div className='line-pokeball' ></div>  
          </div>
          
        </div>
      </div>
      <img src={pokedexTitle} alt="" className='titlePokedex' />
      <Outlet />
      <footer></footer>
    </>
    } else { 
        return <Navigate to='/' />
    }                     // Aquí le debemos decir la ruta a la que queremos llevar
};                        // al usuario si no está autenticado

export default ProtectedRoutes;