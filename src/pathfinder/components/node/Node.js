import React from "react";
import "./Node.css";

const Node = (props) => {
  const { row, col, isWall, isStart, isFinish } = props;
  let extraClassName = "";

  if (isStart) {
    extraClassName = "node-start";
  } else if (isFinish) {
    extraClassName = "node-finish";
  } else if (isWall) {
    extraClassName = "node-wall";
  }

  return (
    <div
      className={`node ${extraClassName}`}
      id={`node-${row}-${col}`}
      onMouseDown={() => props.handleMouseDown(row, col)}
      onMouseEnter={() => props.handleMouseEnter(row, col)}
      onMouseUp={() => props.handleMouseUp()}
    ></div>
  );
};

export default Node;
