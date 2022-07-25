import React, { useState } from "react";
import Grid from "./components/Grid";

function Pathfinder() {
  const [node, setNode] = useState({
    x1: 10,
    y1: 15,
    x2: 10,
    y2: 35,
  });

  const inputEvent = (point, event) => {
    const val = Number(event.target.value);

    if (point === "x1" && (val >= 0 && val <= 19)) { setNode({ ...node, x1: val }); }
    if (point === "y1" && (val >= 0 && val <= 49)) { setNode({ ...node, y1: val }); }
    if (point === "x2" && (val >= 0 && val <= 19)) { setNode({ ...node, x2: val }); }
    if (point === "y2" && (val >= 0 && val <= 49)) { setNode({ ...node, y2: val }); }
  };

  return (
    <div>
      <Grid inputEvent={inputEvent} node={node} />
    </div>
  );
}

export default Pathfinder;
