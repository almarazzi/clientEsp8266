import React, { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";






interface Titolo{
  titolo: string;
}

export const regex = new RegExp("^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$");
export function Toggle_a4( ){
  const [state, stateOn ] = useState(0);
  const [dataInz,SetdataInz] = useState("");
  const [dataFin,SetdataFin] = useState("");
  const [oraFin,SetoraFin] = useState("");
  const [oraInz,SetoraInz] = useState("");
  const [oraTotFin,SetoraTotFin] = useState(0);
  const [oraTotInz,SetoraTotInz] = useState(0);
  const [oraCors,SetoraCors] = useState(0);
  const [tempoCon,SeTtempoCon] = useState(0);
  const [focusIniz, setFocusIniz] = useState(false);
  const [focusFin, setFocustFin] = useState(false);

  

 const handleSubmit = async (dataInz : string) => {
    const d = new Date();
    if(!regex.test(dataInz))
    {
      return;
    }
    let ii= regex.exec(dataInz);
    if(ii == null)
    {
      return;
    }
    let ora = Number(ii[1]);
    let minuti = Number(ii[2]);
    let secondi = Number(ii[3]);
    d.setHours(ora, minuti, secondi);
    let time = d.getTime()/1000;
    const time1 = time.toString();
    const x = {xxxx : dataInz, timeInz: time1 };
    await fetch("http://192.168.1.158/RelaySwitch/SetDataInz", { mode: 'cors' ,method:"POST", body: JSON.stringify(x)});
    
    SetoraInz(dataInz);
  } 
  
 

  const handleSubmit1 = async (dataFin : string) => {
    const d = new Date();
    if(!regex.test(dataFin))
    {
      return;
    }
    let ii= regex.exec(dataFin);
    if(ii == null)
    {
      return;
    }
    let ora = Number(ii[1]);
    let minuti = Number(ii[2]);
    let secondi = Number(ii[3]);
    d.setHours(ora, minuti, secondi);
    let time = d.getTime()/1000;
    const time2 = time.toString();
    const x = {xxxx : dataFin, timeFin : time2};
    await fetch("http://192.168.1.158/RelaySwitch/SetDataFin", { mode: 'cors' ,method:"POST", body: JSON.stringify(x)});

   SetoraFin(dataFin);
  }
  
  useEffect(() => {
  
    const fetchData1 = async () => {
      
      let data = await fetch("http://192.168.1.158/RelaySwitch/GetStateDataFin", {mode: 'cors'});    
      var res = await data.text();
      SetdataFin(res);
      SetoraFin(res);
    }
    
    
    const tt = setInterval(()=>{
    if (focusFin == false) {
      fetchData1();
    }else{

    }
    },500);
     
    
    return () => {
      clearInterval(tt);
      
    }


  },[focusFin]);   
  
  useEffect(() => {
    const fetchData = async () => {
      
      let data = await fetch("http://192.168.1.158/RelaySwitch/GetStateDataInz", {mode: 'cors'});
      var res = await data.text();
      SetdataInz(res);
      SetoraInz(res);
    }
   
    

    const tt = setInterval(()=>{
     if(focusIniz == false){
        fetchData();
     }else{

     }
    },500);
      
    
    return () => {
      clearInterval(tt);
    
    }


  },[focusIniz]);
 
 
  useEffect(() => {
    const fetchData = async () => {
      
      let data = await fetch("http://192.168.1.158/RelaySwitch/GetState" , {mode: 'cors'});    
      var res = await data.json();
      stateOn(res);
  
    }

   
    
    fetchData();
    const timer = setInterval(() =>{
      fetchData();
     },2500);
     return () => {
       clearInterval(timer);
     } 
  }, []);
 

 let totIn=0;  
 let totFi=0;
 let tot =0;
 let ttt=0; 



  useEffect(()=>{
   const oraAttuale = setInterval(() => {
      const d = new Date();
      let ore = d.getHours()*60;
      let minuti = d.getMinutes();
      let tot = ore + minuti; 
      let ii =(tot/1440)*100;
      SeTtempoCon(ii);
    }, 1000);
     

    const fine= setInterval(()=>{

      const d = new Date();

      if(!regex.test(oraFin))
      {
        return;
      }


      let ii= regex.exec(oraFin);
      if(ii == null)
      {
       return;
      }


      let ora = Number(ii[1]);
      let minuti = Number(ii[2]);
      let secondi = Number(ii[3]);
      d.setHours(ora, minuti, secondi);
      let hours = d.getHours()*60;
      let minutis = d.getMinutes();
      let tot = hours + minutis; 
      totFi = (tot/1440)*100;
     // oraTF(totFi); 
    },50);


    const inzio=  setInterval(()=>{ 
      const d = new Date();
      if(!regex.test(oraInz))
      {
        return;
      }


      let ii= regex.exec(oraInz);
      if(ii == null)
      {
        return;
      }


      let ora = Number(ii[1]); 
      let minuti = Number(ii[2]);
      let secondi = Number(ii[3]);
      d.setHours(ora, minuti, secondi);
      let hours = d.getHours()*60;
      let minutis = d.getMinutes();
      let tot = hours + minutis; 
      totIn = (tot/1440)*100;
      SetoraTotInz(totIn);
    },50);


    const durant = setInterval(()=>{ 
      tot = totFi - totIn;
      SetoraCors(tot); 
       ttt =100-(tot + totFi +totIn);
      SetoraTotFin(totFi + ttt);
    },50);


    return () => {
      clearInterval(fine);
      clearInterval(inzio);
      clearInterval(durant);
      clearInterval(oraAttuale);
    }


  },[oraFin, oraInz]);


 return( 
    <div> 

  
     <p className="fs-1 text-center  App_titolo" > </p> 

      <button type="button" className={ "Buttone1  btn btn-" + (state === 1 ?  "primary" : "secondary") }  onClick={async ()=>{ 
       let data = await fetch("http://192.168.1.158/RelaySwitch/SetState/" + 1, { method: "GET" , mode: 'cors'});
       var res = await (data.json());
       stateOn(res);
       
      }}> ON</button>


      <button type="button" className={ "Buttone2 btn btn-" + (state === 0 ?  "primary" : "secondary") }  onClick={async ()=>{ 
       let data = await fetch("http://192.168.1.158/RelaySwitch/SetState/" + 0, { method: "GET", mode: 'cors'});
       var res = await (data.json());
       stateOn(res);
        
      }}> OFF</button>


      <form className="input-group mb-3">
       <span className="input-group-text App_inzio" id="inputGroup-sizing-default">inzio</span>
       <label  className="form-label"></label>
       <DebounceInput 
       type="text" 
       minLength={4}
       debounceTimeout={300}
       value={dataInz} 
       className="form-control input" 
       id="input" 
       placeholder="HH:MM:SS"
       onFocus={() => setFocusIniz(true)} 
       onBlur={() => setFocusIniz(false)} 
       onChange={(e)=>{handleSubmit(e.target.value);
        
       }}  /> 
     </form>


      <form className="input-group mb-3" >
       <span className="input-group-text App_fine" id="inputGroup-sizing-default">fine</span>
       <label  className="form-label"></label>
       <DebounceInput 
        type="text"
        minLength={4}
        debounceTimeout={300}
        value={dataFin} 
        className="form-control input_1" 
        id="input_1" placeholder="HH:MM:SS" 
        onFocus={() => setFocustFin(true)} 
        onBlur={() => setFocustFin(false)} 
        onChange={(a)=>{handleSubmit1(a.target.value);
      
       }} />  
     </form> 

      
      <div className="progress barra">
       <div className="progress-bar bg-success" role="progressbar" style={{width: oraTotInz + '%' }}  aria-valuemin={0} aria-valuemax={100}></div>
       <div className="progress-bar bg-danger" role="progressbar" style={{width: oraCors + '%' }}  aria-valuemin={0} aria-valuemax={100}></div>
       <div className="progress-bar  bg-success" role="progressbar" style={{width: oraTotFin+ '%' }} aria-valuemin={0} aria-valuemax={100}></div> 
      </div>


      <div className="progress barra1">
       <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style={{width: tempoCon + '%' }}  aria-valuemin={0}aria-valuemax={100}></div>
      </div>
       
    
    </div> 
     
  );
  
}





