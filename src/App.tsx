import './App.css';
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import { Layout } from './componenti/Layout'; 
import { Automatico } from './componenti/Automatico';
import { Manuale } from './componenti/Manuale'; 
import { Signin } from './componenti/Signin';
import { useState,useEffect } from 'react';
import { CambiaPassword } from './componenti/CambiaPassword';
import { NuovoAccount } from './componenti/NuovoAccount';

function App() {
  const [token, setToken] = useState(false);
 
  useEffect(()=>{


    const refreshPage = async ()=>{

      let data = await fetch("api/StatoServer",{method:"GET"});
      if(data.status!==200)
      {
        window.location.reload();
      }
      setTimeout(()=>{
        refreshPage();
      },1000);
    };
    refreshPage();

  },[]);
  

  return (
      <div className="App">
          <HashRouter>
              <Routes>
                  <Route path="/" element={ (token === true ? <Layout setToken={setToken}/> : <Signin  setToken={setToken} />)}>
                  <Route path="/Automatico" element={<Automatico />} />
                  <Route path="/CambiaPassword" element={<CambiaPassword/>} />    
                  <Route path="/Manuale" element={<Manuale />} />
                  <Route path="/NuovoAccount" element={<NuovoAccount/>} />          
                </Route>
              </Routes >
            </HashRouter>    
    </div> 
   
  );
  
}
export default App;