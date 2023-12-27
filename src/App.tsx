import './App.css';
import { Routes, Route, BrowserRouter, HashRouter, redirect } from 'react-router-dom';
import { Layout } from './componenti/Layout'; 
import { Automatico } from './componenti/Automatico';
import { Manuale } from './componenti/Manuale'; 
import { Signin } from './componenti/Signin';
import { useState,useEffect } from 'react';
import { CambiaPassword } from './componenti/CambiaPassword';
import { NuovoAccount } from './componenti/NuovoAccount';


function App() {
  const [token, setToken] = useState(false);

  return (
      <div className="App">
          <HashRouter>
              <Routes>
                  <Route path="/" element={ (token === true ? <Layout setToken={setToken}/> : <Signin  setToken={setToken} />)}>
                  <Route path="/Automatico" element={<Automatico />} />
                  <Route path="/CambiaPassword" element={<CambiaPassword/>} />    
                  <Route path="/Manuale" element={<Manuale />} />
                  <Route path="/NuovoAccount" element={<NuovoAccount />} />          
                </Route>
              </Routes >
            </HashRouter>    
      </div> 
  );
  
}
export default App;
