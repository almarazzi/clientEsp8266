import path from "path";
import React, { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";





export const regex = new RegExp("^((2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9]))$"); //,(([0-9][0-9][0-9][0-9])-(0[0-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[0-2]))
export function DayManuale(props: {dayOfWeek: number,array: number[]}) {
  const [dataInz,SetdataInz] = useState("");
  const [dataFin,SetdataFin] = useState("");
  const [oraFin,SetoraFin] = useState("");
  const [oraInz,SetoraInz] = useState("");
  const [oraTotFin,SetoraTotFin] = useState(0);
  const [oraTotInz,SetoraTotInz] = useState(0);
  const [oraCors,SetoraCors] = useState(0);
  const [tempoCon,SeTtempoCon] = useState(0);
  const [Giorno,setGiorno] = useState(0);
  const [focusIniz, setFocusIniz] = useState(false);
  const [focusFin, setFocustFin] = useState(false);
  const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const d = new Date();
    //setGiorno(d.getDate()-d.getDay()+props.dayOfWeek);
    


  const handleSubmit = async (dataInz : string) => {
    const d = new Date();
   // d.setDate(d.getDate()-d.getDay()+props.dayOfWeek);
    if(!regex.test(dataInz))
    {
      return;
    }
    let ii= regex.exec(dataInz);
    if(ii == null)
    {
      return;
    }
    let ora = Number(ii[2]);
    let minuti = Number(ii[3]);
    let secondi = Number(ii[4]);
    d.setHours(ora, minuti, secondi);
    let  time = (ora*3600+minuti*60+secondi);
    const x = {xxxx : dataInz, timeInz: time,day:props.dayOfWeek };
    await fetch("api/RelaySwitch/SetDataInz", { mode: 'cors' ,method:"POST", body: JSON.stringify(x)});
    SetoraInz(dataInz);
    console.log("mils:"+d);
  } 


  const handleSubmit1 = async (dataFin : string) => {
    const d = new Date();
    //d.setDate(d.getDate()-d.getDay()+props.dayOfWeek);
    if(!regex.test(dataFin))
    {
      return;
    }
    let ii= regex.exec(dataFin);
    if(ii == null)
    {
      return;
    }
    let ora = Number(ii[2]);
    let minuti = Number(ii[3]);
    let secondi = Number(ii[4]);
    d.setHours(ora, minuti, secondi);
    let time =  (ora*3600+minuti*60+secondi);
    const x = {xxxx : dataFin, timeFin : time,day: props.dayOfWeek};
    await fetch("api/RelaySwitch/SetDataFin", { mode: 'cors' ,method:"POST", body: JSON.stringify(x)});    
    SetoraFin(dataFin);
    console.log("fin:" +d.getDate());
  }


  useEffect(()=>{
    let inzio = props.array[props.dayOfWeek*2+0];
    let fine = props.array[props.dayOfWeek*2+1];
    let inzio1 = trsformzione(inzio);
    let fine1 = trsformzione(fine);
    function trsformzione(sec: number)
    {
      if(sec == null)
      {
        return ""
      }
    let ora = Math.floor(sec/3600);
    let minuti=Math.floor((sec%3600)/60);
    let secondi =Math.floor((sec%3600)%60);
    //let tot = 
    return ora+":"+minuti+":"+secondi
    }
    SetoraInz(inzio1);
    SetdataInz(inzio1);
    SetoraFin(fine1);
    SetdataFin(fine1);


  },[props.array]);

  let totIn=0;  
  let totFi=0;
  let tot =0;
  let ttt=0; 



  useEffect(()=>{
    setTimeout(() => {
      const d = new Date();
      let ore = d.getHours()*60;
      let minuti = d.getMinutes();
      let tot = ore + minuti; 
      let ii =(tot/1440)*100;
      SeTtempoCon(ii);
    }, 1000);

    setTimeout(()=>{

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


      let ora = Number(ii[2]);
      let minuti = Number(ii[3]);
      let secondi = Number(ii[4]);
      d.setHours(ora, minuti, secondi);
      let hours = d.getHours()*60;
      let minutis = d.getMinutes();
      let tot = hours + minutis; 
      totFi = (tot/1440)*100;
     // oraTF(totFi); 
    },100);


      setTimeout(()=>{ 
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


      let ora = Number(ii[2]); 
      let minuti = Number(ii[3]);
      let secondi = Number(ii[4]);
      d.setHours(ora, minuti, secondi);
      let hours = d.getHours()*60;
      let minutis = d.getMinutes();
      let tot = hours + minutis; 
      totIn = (tot/1440)*100;
      SetoraTotInz(totIn);
    },100);


setTimeout(()=>{ 
      tot = totFi - totIn;
      SetoraCors(tot); 
      ttt =100-(tot + totFi +totIn);
      SetoraTotFin(totFi + ttt);
    },100);

  },[oraFin, oraInz]);
  return( 
        <div className="aa1"> 
          <h2>{days[props.dayOfWeek]}</h2>
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
            }}/> 
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
            }}/>  
          </form> 

        
          <div className="progress barra">
            <div className="progress-bar bg-success" role="progressbar" style={{width: oraTotInz + '%' }}  aria-valuemin={0} aria-valuemax={100}></div>
            <div className="progress-bar bg-danger" role="progressbar" style={{width: oraCors + '%' }}  aria-valuemin={0} aria-valuemax={100}></div>
            <div className="progress-bar  bg-success" role="progressbar" style={{width: oraTotFin+ '%' }} aria-valuemin={0} aria-valuemax={100}></div> 
          </div>


          <div className="progress barra1">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style={{width: tempoCon + '%' }}  aria-valuemin={0}aria-valuemax={100}></div>
          </div>
          <div><hr /></div>
        </div>     
    );
  
}


