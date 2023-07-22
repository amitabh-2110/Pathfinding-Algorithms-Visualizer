import React, { useState } from "react";
import Grid from "./components/Grid";

function Pathfinder() {
  const [node, setNode] = useState({
    x1: 10,
    y1: 20,
    x2: 10,
    y2: 40,
  });

  const inputEvent = (point, event) => {
    const val = Number(event.target.value);

    if (point === "x1" && (val >= 0 && val <= 21)) { setNode({ ...node, x1: val }); }
    if (point === "y1" && (val >= 0 && val <= 56)) { setNode({ ...node, y1: val }); }
    if (point === "x2" && (val >= 0 && val <= 21)) { setNode({ ...node, x2: val }); }
    if (point === "y2" && (val >= 0 && val <= 56)) { setNode({ ...node, y2: val }); }
  };

  const setDefaultNode = () => {
    setNode({x1: 10, y1: 20, x2: 10, y2: 40});
  };

  return (
    <div>
      <Grid 
        inputEvent={inputEvent} 
        node={node}
        setDefaultNode={setDefaultNode} 
      />
    </div>
  );
}

export default Pathfinder;
