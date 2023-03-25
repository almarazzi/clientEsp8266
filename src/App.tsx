import './App.css';
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import { Layout } from './componenti/Layout'; 
import { Automatico } from './componenti/Automatico';
import { Manuale } from './componenti/Manuale'; 
import { Signin } from './componenti/Signin';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(false);
 
  return (
      <div className="App">
          <HashRouter>
              <Routes>
                  <Route path="/" element={ (token === true ? <Layout/> : <Signin  setToken={setToken} />)}>
                  <Route path="/Automatico" element={<Automatico />} />
                  <Route path="/Manuale" element={<Manuale/>} />                 
                </Route>
              </Routes >
            </HashRouter>
         
            
    </div> 
   
  );
  
}
export default App;