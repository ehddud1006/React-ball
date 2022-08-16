import React, { useState } from "react";
import Ball from "./Ball";
import MoveBar from "./MoveBar";

const Board = ({ setEnd }) => {
  const [state, setState] = useState({
    pageX: 0,
    boardStyle: {
      border: "solid 1px",
      height: 480,
      width: 320,
      top: 20,
      left: 25,
      position: "absolute",
    },
    barStyle: {
      height: 10,
      width: 30,
      background: "black",
      left: 20,
      top: 400,
      position: "absolute",
    },
    size: 10,
  });

  function mouseMoveHandler(e) {
    console.log(e.nativeEvent.pageX);
    console.log("e.page", e.pageX);
    let left = 0;
    const boardStyle = state.boardStyle;
    const barStyle = state.barStyle;
    const mouseX = state.pageX - barStyle.width / 2;
    // console.log("mouseX", mouseX);
    // console.log("boardStyle.left", boardStyle.left);
    if (mouseX < boardStyle.left) {
      left = 0; //boardStyle.left;
    } else if (mouseX - boardStyle.left < boardStyle.width - barStyle.width) {
      left = mouseX - boardStyle.left;
    } else {
      left = boardStyle.width - barStyle.width;
    }
    // console.log(left);
    const changeBarStyle = {
      ...state.barStyle,
      left: left,
    };
    const changeState = {
      ...state,
      pageX: e.nativeEvent.pageX,
      barStyle: changeBarStyle,
    };
    setState(changeState);
  }

  return (
    <>
      <div
        onTouchMove={mouseMoveHandler}
        onMouseMove={mouseMoveHandler}
        style={state.boardStyle}
      >
        <MoveBar barStyle={state.barStyle}></MoveBar>
        <Ball
          setEnd={setEnd}
          boardStyle={state.boardStyle}
          barStyle={state.barStyle}
        ></Ball>
      </div>
    </>
  );
};

export default Board;
