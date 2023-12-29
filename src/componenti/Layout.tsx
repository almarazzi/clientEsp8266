import moment from "moment";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import 'moment/locale/it';
import { Interface } from "readline";

interface LoggedUser{
    readonly username: string;
    readonly isAdmin: boolean;
}

export function Layout(props: { setToken: (t: boolean) => void }) {
 const [, Data] = useState("");
 const [grado, setGrado] = useState(false);
 const [nomeUtente, setNomeUtente] = useState("");
 const d = new Date();
 setTimeout(() => {
    Data(d.toString());
 }, 1000);
 //var lingua= moment.locale("it");
let data =moment().format(' HH:mm DD/MM/Y');

const Logout = useCallback(async () => {
    let res = await fetch("/Login/Logout", { method: "GET"});
    if(res.status===404)
    {
        props.setToken(false);
    }
},[props]);


useEffect(() => {
        
    const fetchData = async () => {
        
        let data = await fetch("/Login/GetLoggedUser" , {method: 'GET'});
        var res = await data.json() as LoggedUser;
        setGrado(res.isAdmin);
        setNomeUtente(res.username);
    };
    fetchData();
},[grado, nomeUtente]);


    return (
    <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark iii ">
            <div className="container-fluid">
                <a className="navbar-brand">  {data} Irrigazione  Benvenuto {nomeUtente}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Menu 
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><Link to="/Manuale" className="dropdown-item">Automatico</Link></li>
                                <li><Link to="/Automatico" className="dropdown-item">Manuale</Link></li>
                                <li><Link to="/CambiaPassword" className="dropdown-item">CambiaPassword</Link></li>
                                
                                <li><Link to={"/"+(grado===true ? "NuovoAccount": null)} className={""+(grado===true ? "dropdown-item": null)}>{(grado===true ? "NuovoAccount": null)}</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <button type="button" className=" btn btn-dark" onClick={Logout}>Logout</button>
                </div>
            </div>
            
        </nav>
        <Outlet/>
    </Fragment>
    );
}



