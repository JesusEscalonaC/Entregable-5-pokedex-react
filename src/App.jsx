import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Pokedex from './Components/Pokedex'
import PokedexID from './Components/PokedexID'
import InputName from './InputName'
import ProtectedRoutes from './Components/ProtectedRoutes'

function App() {
  

  return (
    <div className="App">
      <HashRouter>
        <Routes>

            <Route path='/' element={<InputName/>} />

            <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<Pokedex/>}/>
            <Route path='/pokedex/:id' element={<PokedexID/>} />
            </Route>

        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
