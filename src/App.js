import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Menu from "./components/menu";
import Countries from "./components/countries";
import Country from "./components/country";

function App() {
  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + '/img/text/Logo.png'} width="30%" className="mt-2"/>
      <div>
         <div className="container">
            <BrowserRouter>
              <Routes>       
                <Route path='/' element={<Menu/>} exact></Route>
                <Route path='/countries/:continent' element={<Countries/>} exact></Route> 
                <Route path='/country/:country' element={<Country/>} exact></Route>
              </Routes>
            </BrowserRouter>
         </div>
      </div>

    </div>
  );   
}

export default App;
