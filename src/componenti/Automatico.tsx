import { useEffect, useState,useCallback, Fragment } from "react";





export function Automatico (){
    const [state, stateOn ] = useState("");
    const [M,setM]= useState(false);
    useEffect(() => {
      let isactive= true;

        const fetchData = async () => {
          
          let data = await fetch("api/RelaySwitch/GetState" , {method: 'GET'});    
          var res = await data.text();
        
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
          let data = await fetch("api/RelaySwitch/GetProgrammManu" , {method: 'GET'});    
          var res = await data.json();
          if(isactive)
          {
            setM(res.valoreBool);
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
        await fetch("api/RelaySwitch/stateProgrammManu",{method:"PUT",body: JSON.stringify(inv)});
        setM(!M);
    },[M]);
  

    return(
      <Fragment>
                    <div className=" Manuale">
                        <input className="form-check-input " type="checkbox"  checked={M} onChange={y} id="invalidCheck" required />
                        <label className="form-check-label">Manuale</label>
                    </div>

            <button type="button" className={ "Buttone1  btn btn-" + (state === "1" ?  "primary" : "secondary") }  onClick={async ()=>{ 
              let data = await fetch("api/RelaySwitch/SetState/" + 1, { method: "PUT" });
              var res = await (data.text());
              stateOn(res);
            }}> ON</button>

            <button type="button" className={ "Buttone2 btn btn-" + (state === "0" ?  "primary" : "secondary") }  onClick={async ()=>{ 
              let data = await fetch("api/RelaySwitch/SetState/" + 0, { method: "PUT"});
              var res = await (data.text());
              stateOn(res);
            }}> OFF</button>
        </Fragment>
    );
}   

export default Automatico;