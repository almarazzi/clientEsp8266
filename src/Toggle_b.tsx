import React, { Component,useState } from "react";
/*
interface Props{
    caption: string;
}

interface State{
    isOn: boolean;
    count: number;
}

export class Toggle_b extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            isOn: false,
            count: 0,
        }

    }

    render() {
        return(
        <div>
            {this.props.caption} 
            <button onClick={()=>this.setState({isOn: true, count: this.state.count+1})}>ON</button>
            <button onClick={()=>this.setState({isOn: false})}>OFF</button>
            {this.state.isOn ? "ON" : "OFF"}
            {this.state.count}
        </div>
        );
    }

}*/


/*export function Toggle_b2(props: Props){
    const [state, setState] = useState<State>({
        isOn: false,
        count: 0,
    });
    return(
        <div>
            {props.caption}
            <button onClick={()=>setState({isOn:true, count: state.count+1})}>ON</button>
            <button onClick={()=>setState({...state, isOn:false})}>OFF</button>
            {state.isOn ? "ON" : "OFF"}
            {state.count}
        </div>
    )
}*/

export function  Toggle_b3()  {
    const [isOn, setOn] = useState(false);
    const [count, setCount] = useState(0);
    return(
        <div>
            
            <button onClick={()=> {
                setOn(true); 
                setCount(count+1);
            }}>ON</button>
            <button onClick={()=>setOn(false)}>OFF</button>
            {isOn ? "ON" : "OFF"}
            {count}
        </div>
    );
}    
export default Toggle_b3;

/*
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark iii ">
                <div className="container-fluid">
                      <a className="navbar-brand" >Irrigazione</a>
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
                                      <li><a className="dropdown-item" href="/Toggle_b3"   >Automatico</a></li>
                                      <li><a className="dropdown-item" href="/react">Manuale</a></li>
                                      <li><a className="dropdown-item" href="/#">Home page</a></li>
                                      </ul>
                                  </li>
                              </ul>
                      </div>
                </div>
            </nav>
*/











       











