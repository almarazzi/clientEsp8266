import React, { useCallback, useEffect, useState } from "react";

export function Signin(props: { setToken: (t: boolean) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {

    const Autenticazione = async () => {
      let data = await fetch("/Login/Autenticazione", { method: "GET" });
      //let res = await data.json();
      if (data.status === 200) {
        props.setToken(true);
      }


    };
    Autenticazione();


  }, []);
  const signIn = useCallback(async () => {
    let res = await fetch("/Login/cookie", { body: JSON.stringify({ username, password }), method: "POST", headers: { 'Content-type': 'application/json; charl set=UTF-8' } });
    if (res.status === 200) {
      props.setToken(true);
    }
    else {
      setInvalid(true);
    }
  }, [username, password, props]);

  const invio = (event: { key: any; }) => {
    if (event.key === "Enter") {
      signIn();
    }
  }

  return (
    <div className="row container">
      <form className="aa">
        <div className="titolo fw-bolder" >centralina di irrigazione </div>
        <div className=" form-floating is-invalid md-3 UserNametex">
          <input type="text" value={username} className={"form-control is-" + (invalid === true ? "invalid" : "")} placeholder=" " id="inputEmail3" onChange={(a) => { setUsername(a.target.value); }} />
          <label form="inputEmail3">UserName</label>
        </div>


        <div className="form-floating is-invalid md-3 Passwordtex">
          <input type="password" value={password} className={"form-control is-" + (invalid === true ? "invalid" : "")} placeholder=" " id="inputPassword3" onChange={(a) => { setPassword(a.target.value) }} onKeyDown={invio} />
          <label form="inputPassword3">Password</label>
        </div>



        <button type="button" className="BouttonSignin btn btn-success" onClick={signIn}>Login</button>
      </form>



    </div>
  );





}

/* className={"form-control is-"+(invalid === true ? "invalid": "" )}*/