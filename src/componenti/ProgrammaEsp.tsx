import { useEffect, useState } from "react";

interface Lista{
    readonly nomeEspClient: string;
    readonly ipEsp : string;
    
}
interface key{
   key: string;
   value:Lista;

}


export function ProgrammaEsp() {

    const [lista, Setlista] = useState([] as key[]);

    useEffect(() => {        
        let isActive = true;
        const fetchData = async () => {            
            let data = await fetch("/apiEsp/Bro" , {method: 'GET'});
            if(!isActive) return;
            var res = await data.json() as key[];
            if(!isActive) return;
            Setlista(res);
            if(isActive===true) setTimeout(()=>{fetchData();},500);
            console.log(lista as key[]);
        };
        fetchData();
        return ()=>{isActive=false;}  
    },[]);

    return(
        <div className="prova">
            <table border={2} width={500}>
                <thead>
                    <tr>
                        <th className="tabella">Numero Esp</th>
                        <th className="tabella">MAC Esp</th>
                        <th className="tabella">Indirizzo Ip ESP</th>
                        <th className="tabella">Nome Esp</th>
                    </tr>  
                </thead>
                <tbody>
                    {lista.map((u, i) =>
                        <tr key={u.key}>
                            <td className="tabella">{i}</td>
                            <td className="tabella">{u.key}</td>
                            <td className="tabella">{u.value.ipEsp}</td>
                            <td className="tabella">{u.value.nomeEspClient}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}