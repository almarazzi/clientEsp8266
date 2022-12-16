import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout'; 
import { Automatico } from './Automatico';
import { Manuale } from './Manuale'; 
import { Signin } from './Signin';
import {   useState } from 'react';


function App() {
  const [token, setToken] = useState(false);
  
  


   
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={ (token === true ? <Layout/> : <Signin  setToken={setToken} />)}>
                  <Route path='Automatico' element={<Automatico />} />
                  <Route path='Manuale' element={<Manuale />}/>                  
                </Route>
              </Routes >
            </BrowserRouter>               
    </div> 
   
  );
  
}
export default App;
