import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout'; 
import { Automatico } from './Automatico';
import { Manuale } from './Manuale'; 
import { Signin } from './Signin';


function App() {
  return (
      <div className="App"> 
          <BrowserRouter>
              <Routes >
                <Route path='/' element={<Layout/>}>
                  <Route path='Automatico' element={<Automatico />} />
                  <Route path='Manuale' element={<Manuale />}/> 
                  <Route path='Signin' element={ <Signin/> }/> 
                </Route>
              </Routes >
            </BrowserRouter>               
    </div> 
   
  );
  
}
export default App;
