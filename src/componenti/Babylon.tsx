import {  useCallback, useEffect, useRef,useState } from "react";
import * as BABYLON from "@babylonjs/core";
import Automatico from "./Automatico";
interface Lista{
  readonly nomeEspClient: string;
  readonly ipEsp : string;
  readonly abilitazione:boolean;
}
interface key{
  key: string;
  value:Lista;
}

interface Tutto {
  state : boolean,
  macricever: string
}

export function Babylon (props:{mac:Array<key>}){
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scenaRef= useRef<BABYLON.Scene>();
  const[visibilita,setVisibilita] = useState(false);
  const[key,setkey] = useState(0);
  const[oggetto,setoggetto] = useState<BABYLON.Mesh[]>([] as BABYLON.Mesh[]);
  const[mac,setMac] = useState("");
  const[RelayActive,setRelayActive] = useState([] as Tutto[]);
  
  useEffect(() => {
    const contenitore = containerRef.current;
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    scenaRef.current= scene;
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    engine.runRenderLoop(() => {
      scene.render();
    });

    const dimenzioni = () => {
      if (canvas && contenitore) {
        canvas.width = contenitore.clientWidth;
        canvas.height = contenitore.clientHeight;
        engine.resize();
      }
    };
    const oggettoDimenzioni = new ResizeObserver(dimenzioni);
    if (contenitore)
    oggettoDimenzioni.observe(contenitore);

    dimenzioni();
    return () => {
      oggettoDimenzioni.disconnect();
      engine.dispose();
    };
  }, []);

  useEffect(()=>{
    if(oggetto.length !== props.mac.length)
    {
      setoggetto(props.mac.map((u,i)=>{
        return irrigazione({name:u.key,x:i});
      }));
    }
    else
    setoggetto(oggetto);
  },[props.mac]);

useEffect(()=>{
  if(scenaRef.current)
    scenaRef.current.onPointerDown = function (_, pickResult) {
      if (pickResult.hit && pickResult.pickedMesh) 
      {
        const ogg = oggetto.find((u)=>u.name === pickResult.pickedMesh?.name );
        if(ogg)
        {
          setVisibilita(true);
          setMac(ogg.name);
        }
      }
    };
  },[oggetto]);

useEffect(()=>{
  RelayActive.map((h,_)=>{
    const ogg = oggetto.find((u)=>u.name === h.macricever);
    if( h.state===true && ogg?.position.y===-0.45)
    {
      animazioneSu({oggetto:ogg, tinziale: performance.now()});
    }
    else if( h.state===false && ogg?.position.y===0.4)
    {
      animazioneGiu({oggetto:ogg, tinziale: performance.now()});
    }
  });
},[RelayActive]);


  useEffect(()=>{
    let active= true;
    const fetchApi = async ()=>{
      let data = await fetch("/api/RelaySwitch/GetState" , {method: 'GET',headers: { 'Content-type': 'application/json; charl set=UTF-8' }});  
      var res = await data.json() as Tutto[];
      if(active)
      {
        setRelayActive(res);
        setTimeout(()=>{
          fetchApi();
        },500);
      }
    };
    fetchApi();
    return()=>{
      active=false;
    };
  },[]);



  function irrigazione(props:{name:string,x:number}){
      var irrigazione = BABYLON.CreateCylinder(props.name,{height:1, diameter:0.2});
      var r = new BABYLON.StandardMaterial("");
      r.diffuseColor = new BABYLON.Color3(0.45, 0.56, 0.53);
      irrigazione.material=r;
      irrigazione.position.x=props.x;
      irrigazione.position.y=-0.45;
      return irrigazione;
  };

function animazioneSu(props:{ oggetto:  BABYLON.Mesh; tinziale: number}){
  props.oggetto.onBeforeRenderObservable.add(()=>{
    const t = (performance.now()- props.tinziale)/1000;
    if(t<1)
    {
      props.oggetto.position.y =-0.45+Math.sin(t*(Math.PI/2))*(0.4+0.45);
    }
    else
    {
      props.oggetto.position.y=0.4;
    }
  }); 
}

function animazioneGiu(props:{ oggetto:  BABYLON.Mesh; tinziale: number}){
  props.oggetto.onBeforeRenderObservable.add(()=>{
    const t = (performance.now()- props.tinziale)/1000;
    if(t<1)
    {
      props.oggetto.position.y =0.4-Math.sin(t*(Math.PI/2))*(0.4+0.45);
    }
    else
    {
      props.oggetto.position.y=-0.45;
    } 
  }); 
}
 useEffect(()=>{
  setkey(key+1);
 },[mac])


  const X = useCallback(()=>{
    setVisibilita(false);
  },[visibilita]);

  return (
    <div ref={containerRef} className="contenitore">

      {visibilita &&( 
        <div className="finestra">
          <h4 className="titolo">{mac}</h4>
          <Automatico key={key} mac={mac} />
          <button onClick={X}>X</button>
        </div>
      )}

      <canvas ref={canvasRef}  />
    </div>
  );
}




