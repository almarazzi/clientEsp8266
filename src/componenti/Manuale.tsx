import { Fragment, useEffect, useState, useCallback } from "react";
import { DayManuale } from "./DayManuale";


export function Manuale(){  
const [r, setr] = useState([]);
const [A,setA]= useState(false);
    useEffect(() => {
            let isactive= true;
            const fetchData1 = async () => {
            let data = await fetch("api/RelaySwitch/GetWeekProgram" ,{method:'GET'});    
            const res = await data.json();
            if(isactive)
            {
                setr(res);
                setTimeout(() =>{
                    fetchData1();
                },500);
            }
            };
            fetchData1();
            return() => {
            isactive=false;
            };
    },[]);
    console.log("prima: "+A);

    const p = ()=>{setA(!A)};
    const p1 = useCallback(async () => {
        const inv={stateProgrammAuto: !A};
        await fetch("api/RelaySwitch/stateProgrammAuto",{method:"PUT",body: JSON.stringify(inv)})

    },[A]);
    useEffect(() => {
        let isactive= true;
        const fetchData1 = async () => {
        let data = await fetch("api/RelaySwitch/GetProgrammAuto" ,{method:'GET'});    
        let res = await data.json();
        if(isactive)
        {
            setA(res.valoreBool);
            setTimeout(() =>{
                fetchData1();
            },500);
        }
        };
        fetchData1();
        return() => {
        isactive=false;
        };
    },[]);
    
    console.log("dopo: "+A);

    return <Fragment>
        
        <div className="Automatico">
            <input className="form-check-input " type="checkbox" checked={A}  onChange={p}  onClick={p1} id="invalidCheck" required />
            <label className="form-check-label">Automatico</label>
        </div>
        {
        [...Array(7)].map((_,i) => 
            <DayManuale key={i}  dayOfWeek={i} array={r}/>
            )}
    
    </Fragment>    
}