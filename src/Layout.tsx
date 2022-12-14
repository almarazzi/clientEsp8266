import moment from "moment";
import { Fragment, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import 'moment/locale/it';


export function Layout() {
 const [, Data] = useState("");
 const d = new Date();
 setTimeout(() => {
    Data(d.toString());
 }, 1000);
 //var lingua= moment.locale("it");
let data =moment().format(' HH:mm:ss DD/M/YY');
 
    return (
    <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark iii ">
            <div className="container-fluid">
                <a className="navbar-brand">  {data} Irrigazione</a>
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
                                <li><Link to="/Automatico" className="dropdown-item">Automatico</Link></li>
                                <li><Link to="/Manuale" className="dropdown-item">Manuale</Link></li>
                                </ul>
                            </li>
                            
                        </ul>
                       
                </div>
               
            </div>
           
        </nav>
        <Outlet/>
    </Fragment>
    );
}
/*<li><Link to="/Signin" className="dropdown-item">Sign in</Link></li>*/ 