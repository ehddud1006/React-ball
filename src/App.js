import Board from "./Board";
import React, { useEffect, useState } from "react";
import "./App.css";

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  console.log(vh);
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

function App() {
  useEffect(() => {
    setScreenSize();
  }, []);
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "calc(var(--vh) * 100)",
  };
  const [end, setEnd] = useState(false);
  return (
    <div className="wrap">
      {end ? <div style={style}>end</div> : <Board setEnd={setEnd}></Board>}
    </div>
  );
}

export default App;
