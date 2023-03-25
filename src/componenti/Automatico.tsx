import React, { useEffect, useState } from "react";





export function Automatico (){
    const [state, stateOn ] = useState("");
    useEffect(() => {
      let isactive= true;

        const fetchData = async () => {
          
          let data = await fetch("/RelaySwitch/GetState" , {method: 'GET'});    
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
   

    return(
       <div>
            <button type="button" className={ "Buttone1  btn btn-" + (state === "1" ?  "primary" : "secondary") }  onClick={async ()=>{ 
              let data = await fetch("/RelaySwitch/SetState/" + 1, { method: "GET" });
              var res = await (data.text());
              stateOn(res);
        
            }}> ON</button>


            <button type="button" className={ "Buttone2 btn btn-" + (state === "0" ?  "primary" : "secondary") }  onClick={async ()=>{ 
              let data = await fetch("/RelaySwitch/SetState/" + 0, { method: "GET"});
              var res = await (data.text());
              stateOn(res);
                
            }}> OFF</button>



        </div>
    );
}   

export default Automatico;