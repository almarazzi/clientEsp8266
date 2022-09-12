import React, { useEffect, useState } from "react";



export function Automatico(){
    const [state, stateOn ] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
          
          let data = await fetch("/RelaySwitch/GetState" , {mode: 'cors'});    
          var res = await data.json();
          stateOn(res);
      
        }
    
       
        
        fetchData();
        const timer = setInterval(() =>{
          fetchData();
         },1000);
         return () => {
           clearInterval(timer);
         } 
    }, []);



    return(
       <div>
          

            <button type="button" className={ "Buttone1  btn btn-" + (state === 1 ?  "primary" : "secondary") }  onClick={async ()=>{ 
              let data = await fetch("/RelaySwitch/SetState/" + 1, { method: "GET" , mode: 'cors'});
              var res = await (data.json());
              stateOn(res);
        
            }}> ON</button>


            <button type="button" className={ "Buttone2 btn btn-" + (state === 0 ?  "primary" : "secondary") }  onClick={async ()=>{ 
              let data = await fetch("/RelaySwitch/SetState/" + 0, { method: "GET", mode: 'cors'});
               var res = await (data.json());
              stateOn(res);
                
            }}> OFF</button>



        </div>
    );
}   