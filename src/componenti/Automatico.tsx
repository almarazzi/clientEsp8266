import { useEffect, useState,useCallback, Fragment } from "react";





export function Automatico (){
    const [state, stateOn ] = useState(false);
    const [M,setM]= useState(false);
    useEffect(() => {
      let isactive= true;

        const fetchData = async () => {
          
          let data = await fetch("/api/RelaySwitch/GetState" , {method: 'GET',headers: { 'Content-type': 'application/json; charl set=UTF-8' }});    
          var res = await data.json();
        
          if(isactive)
          {
            stateOn(res);
            setTimeout(() =>{
              fetchData();
              
            },500);
          }
        };
        
        fetchData(); 
        return() => {
          isactive=false;
        };
    },[]);


    useEffect(() => {
      let isactive= true;
        const fetchData = async () => {
          let data = await fetch("/api/RelaySwitch/GetProgrammManu" , {method: 'GET',headers: { 'Content-type': 'application/json; charl set=UTF-8' }});    
          var res = await data.json();
          if(isactive)
          {
            setM(res);
            setTimeout(() =>{
              fetchData();
              
            },500);
          }
        };
        fetchData();
        return() => {
          isactive=false;
        };
    },[]);
    const y= useCallback (async () => {

        const inv={stateProgrammManu: !M};
        await fetch("/api/RelaySwitch/stateProgrammManu",{method:"PUT",body: JSON.stringify(inv) ,headers: { 'Content-type': 'application/json; charl set=UTF-8' }});
        setM(!M);
    },[M]);
  

    return(
      <Fragment>
                    <div className=" Manuale">
                        <input className="form-check-input " type="checkbox"  checked={M} onChange={y} id="invalidCheck" required />
                        <label className="form-check-label">Manuale</label>
                    </div>

            <button type="button" className={ "Buttone1  btn btn-" + (state === true ?  "primary" : "secondary") }  onClick={async ()=>{ 
              let data = await fetch("/api/RelaySwitch/SetState/" + true, { method: "PUT" ,headers: { 'Content-type': 'application/json; charl set=UTF-8' }});
              var res = await (data.json());
              stateOn(res);
            }}> ON</button>

            <button type="button" className={ "Buttone2 btn btn-" + (state === false ?  "primary" : "secondary") }  onClick={async ()=>{ 
              let data = await fetch("/api/RelaySwitch/SetState/" + false, { method: "PUT",headers: { 'Content-type': 'application/json; charl set=UTF-8' }});
              var res = await (data.json());
              stateOn(res);
            }}> OFF</button>
        </Fragment>
    );
}   

export default Automatico;