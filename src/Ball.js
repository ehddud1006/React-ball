import React, { useState, useEffect, useRef } from "react";
import { isCrashTop, isCrashBottom } from "./IsCrash";
const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  //   console.log(savedCallback);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  //   console.log(delay);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    // console.log(tick);
    if (delay !== null) {
      // unmount 가 없으면 callback 이 계속 바뀌어 useEffect가 엄청 실행되어버림
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const boardCrash = (state, setState, boardStyle) => {
  const changeState = {
    ...state,
  };
  const changeStyle = {
    ...state.style,
  };
  // 공 크기 조절해야댐
  if (state.style.left < 0) {
    changeState.dir.x = -changeState.dir.x;
    changeStyle.left = 0;
    changeState.style = changeStyle;
    setState(changeState);
  } else if (changeStyle.left > boardStyle.width - changeStyle.width) {
    changeState.dir.x = -changeState.dir.x;
    changeStyle.left = boardStyle.width - changeStyle.width;
    changeState.style = changeStyle;
    setState(changeState);
  } else if (changeStyle.top < 0) {
    changeState.dir.y = -changeState.dir.y;
    changeStyle.top = 0;
    changeState.style = changeStyle;
    setState(changeState);
  } else if (changeStyle.top > boardStyle.height - changeStyle.height) {
    changeState.dir.y = -changeState.dir.y;
    changeStyle.top = boardStyle.height - changeStyle.height;
    changeState.style = changeStyle;
    setState(changeState);
  }
};

const barCrash = (state, setState, barStyle) => {
  const changeDir = {
    ...state,
  };
  if (isCrashTop(state, barStyle)) {
    if (!changeDir.touchFlag) {
      changeDir.dir.y = -changeDir.dir.y;
      changeDir.touchFlag = true;
      setState(changeDir);
    }
  } else if (isCrashBottom(state, barStyle)) {
    if (!changeDir.touchFlag) {
      changeDir.dir.y = -changeDir.dir.y;
      changeDir.touchFlag = true;
      setState(changeDir);
    }
  } else {
    if (changeDir.touchFlag) {
      changeDir.touchFlag = false;
      setState(changeDir);
    }
  }
};

const Ball = ({ setEnd, boardStyle, barStyle }) => {
  const [state, setState] = useState({
    style: {
      height: 10,
      width: 10,
      left: 0,
      top: 0,
      position: "absolute",
    },
    dir: {
      x: 1,
      y: 1,
    },
    r: 4,
    strokeWidth: 1, //
    touchFlag: false,
  });

  useInterval(() => {
    const changePos = {
      ...state,
      style: {
        left: 1.5 * state.dir.x + state.style.left,
        top: 1.5 * state.dir.y + state.style.top,
        position: "absolute",
        height: 10,
        width: 10,
      },
    };
    if (changePos.style.top >= 471) {
      setEnd(true);
    }
    setState(changePos);
  }, 10);

  boardCrash(state, setState, boardStyle);
  barCrash(state, setState, barStyle);
  const circle = (
    <svg style={state.style}>
      <circle
        cx={5}
        cy={5}
        r={state.r}
        // stroke="black"
        strokeWidth={state.strokeWidth}
        fill="red"
      />
    </svg>
  );

  return <>{circle}</>;
};

export default Ball;
