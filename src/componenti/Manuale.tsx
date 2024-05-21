import { Fragment, useEffect, useState, useCallback } from "react";
import { DayManuale } from "./DayManuale";

interface Oragiorno{
    readonly oraInizio: string;
    readonly oraFine: string;
    readonly day: number;
}
export function Manuale(){  
const [r, setr] = useState([] as Oragiorno[]);
const [A,setA]= useState(false);
const a = new Date();
    useEffect(() => {
            let isactive= true;
            const fetchData1 = async () => {
            let data = await fetch("/api/RelaySwitch/GetWeekProgram" ,{method:'GET' ,headers: { 'Content-type': 'application/json; charl set=UTF-8' }});    
            const res = await data.json() as Oragiorno[];
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


    const p1 = useCallback(async () => {
        const inv={stateProgrammAuto: !A};
        await fetch("/api/RelaySwitch/stateProgrammAuto",{method:"PUT",body: JSON.stringify(inv),headers: { 'Content-type': 'application/json; charl set=UTF-8' }})
        setA(!A);
    },[A]);
    useEffect(() => {
        let isactive= true;
        const fetchData1 = async () => {
        let data = await fetch("/api/RelaySwitch/GetProgrammAuto" ,{method:'GET' ,headers: { 'Content-type': 'application/json; charl set=UTF-8' }});    
        let res = await data.json();
        if(isactive)
        {
            setA(res);
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
    

    return <Fragment>
        
        <div className="Automatico">
            <input className="form-check-input " type="checkbox" checked={A}  onChange={p1}   id="invalidCheck" required />
            <label className="form-check-label">Automatico</label>
        </div>
        
        {
        [...Array(7)].map((_,i) => 
            <div className={""+(a.getDay()!==i ?"opacity-25":null)} >
            <DayManuale key={i}  dayOfWeek={i}  array={r} />
            </div>
            )}
    
    </Fragment>    
}