import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/HomeComponent/Home.jsx';
import Error from './Components/Error/Error.jsx';

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
