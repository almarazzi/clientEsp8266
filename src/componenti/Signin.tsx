import React, { useCallback, useState } from "react";


export function Signin(props:{setToken : (t: boolean )=> void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
  
    const signIn = useCallback(async ()=>{
        let res = await fetch("/Signin",{body: JSON.stringify({username, password}), method: "POST"});
        if(res.status === 200 ) {
          props.setToken(true);
        }
        else {
          setInvalid(true);
        }
      }, [username, password, props]);

    return(
        <div> 
          <form className="aa">
            <div className="titolo" >centralina di irrigazione </div>
            <div className=" form-floating is-invalid md-3 UserNametex">
            <input type="text" value={username} className={"form-control is-"+(invalid === true ? "invalid": "" )} placeholder="." id="inputEmail3" onChange={(a)=>{setUsername(a.target.value);}}/>
            <label form="inputEmail3">UserName</label>
            </div>

         
            <div className="form-floating is-invalid md-3 Passwordtex">
            <input type="password" value={password} className={"form-control is-"+(invalid === true ? "invalid": "" )} placeholder="."  id="inputPassword3" onChange={(a)=>{setPassword(a.target.value);}}/>
            <label form="inputPassword3">Password</label>
            </div>
            
            

            <button type="button" className="BouttonSignin btn btn-success" onClick={signIn}>Login</button>
            </form>
            


        </div>
     );
  
  
      
        
     
}

/* className={"form-control is-"+(invalid === true ? "invalid": "" )}*/