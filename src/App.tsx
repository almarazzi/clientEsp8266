import './App.css';
import { Routes, Route,  HashRouter } from 'react-router-dom';
import { Layout } from './componenti/Layout'; 
import { Automatico } from './componenti/Automatico';
import { Manuale } from './componenti/Manuale'; 
import { Signin } from './componenti/Signin';
import { useEffect, useState } from 'react';
import { CambiaPassword } from './componenti/CambiaPassword';
import { NuovoAccount } from './componenti/NuovoAccount';
import { ControlloUtenti } from './componenti/ControlloUtenti';

interface GetRuolo{
  readonly ruolo: string;
  readonly username: string;
}
function App() {
  const [token, setToken] = useState(false);
  const [grado, setGrado] = useState("");
  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
        
        let data = await fetch("/Login/GetRuolo" , {method: 'GET'});
        if(!isActive) return;
        var res = await data.json() as GetRuolo;
        if(!isActive) return;
        setGrado(res.ruolo);
        console.log(res.ruolo);
    };
    fetchData();
    return ()=>{isActive=false;}  //cleanup when component unmounts
},[token]);
  return (
      <div className="App">
          <HashRouter>
              <Routes>
                  <Route path="/" element={ (token === true ? <Layout setToken={setToken}/> : <Signin  setToken={setToken} />)}>
                  <Route path="/Automatico" element={(grado==="Admin" || grado==="Basic"?<Automatico />:null)} />
                  <Route path="/CambiaPassword" element={(grado==="Admin" || grado==="Basic"?<CambiaPassword/>:null)} />    
                  <Route path="/Manuale" element={(grado==="Admin" || grado==="Basic"?<Manuale />:null)} />
                  <Route path="/NuovoAccount" element={(grado==="Admin" || grado==="root"?<NuovoAccount /> :null)} />
                  <Route path="/ControlloUtenti" element={(grado==="Admin"?<ControlloUtenti />:null)} />          
                </Route>
              </Routes >
            </HashRouter>    
      </div> 
  );
}
export default App;
