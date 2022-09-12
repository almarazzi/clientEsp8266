import React, {   useState } from "react";


export function Signin(){
    const [UserName, SetUserName] = useState("");
    const [Password, SetPassword] = useState("");
   
    let premi =0;
   
    return(
        <div> 
          <form>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label UserName">UserName:</label>
            <div className="col-sm-10">
            <input type="text" value={UserName} className="form-control UserNametex" id="inputEmail3" onChange={(a)=>{SetUserName(a.target.value);}}/>
            </div>
            </div>
            <div className="row mb-3">
            <label className="col-sm-2 col-form-label Password">Password:</label>
            <div className="col-sm-10">
            <input type="password" value={Password} className="form-control Passwordtex" id="inputPassword3" onChange={(a)=>{SetPassword(a.target.value);}}/>
            </div>
            </div>  
            <button type="button" className="BouttonSignin btn btn-primary" onClick={async ()=>{
              if(premi === 0)
              {
              const p ={UserName : UserName, Password : Password};
             await fetch ("/Signin", {mode : 'cors' ,method: "POST",body : JSON.stringify(p) });
              
              }
             premi++;
            }}>Login</button>
            </form>
        </div>
     );



}
