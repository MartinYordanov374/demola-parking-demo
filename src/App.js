import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Home from './Components/HomeComponent/Home.jsx';
import Error from './Components/Error/Error.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path='/'/>
        <Route Component={Home} path='/home'/>
        <Route Component={Error} path='*'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
