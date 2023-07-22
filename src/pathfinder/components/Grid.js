import React, { useState, useEffect } from "react";
import Node from "./node/Node";
import Navbar from "./Navbar";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar, getNodesInShortestPath } from "../algorithms/astar";
import "./Grid.css";

const Grid = (props) => {
  const [gridState, setGridState] = useState({
    grid: [],
    mousePressed: false,
    algoStarted: false
  });

  useEffect(() => {
    let grid = gridState.grid;
    if(grid.length === 0)
      grid = getGrid();

    const newGrid = grid.map((arrayOfObject) => {
      const arr = arrayOfObject.map((obj) => {
        const newObj = {
          ...obj,
          isStart: obj.row === props.node.x1 && obj.col === props.node.y1,
          isFinish: obj.row === props.node.x2 && obj.col === props.node.y2
        };
        return newObj;
      });
      return arr;
    });

    setGridState({ ...gridState, grid: newGrid });
  }, [props]);

  const getGrid = () => {
    const grid = [];

    for (let row = 0; row < 22; row++) {
      let currRow = [];
      for (let col = 0; col < 57; col++) {
        const currentNode = {
          row,
          col,
          distance: Infinity,
          fDistance: Infinity,
          hDistance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
          isStart: row === 10 && col === 20,
          isFinish: row === 10 && col === 40,
        };
        currRow.push(currentNode);
      }
      grid.push(currRow);
    }

    return grid;
  };

  const clear = () => {
    props.setDefaultNode();
    setGridState({ mousePressed: false, algoStarted: false, grid: getGrid() });

    for(let i = 0; i < 22; i++) {
      for(let j = 0; j < 57; j++) {
        const id = document.getElementById(`node-${i}-${j}`);
        
        if(i === 10 && j === 20) {
          id.className = "node node-start";
        } else if(i == 10 && j === 40) {
          id.className = "node node-finish";
        } else {
          id.className = "node ";
        }
      }
    }
  };

  const getNewGridWithToggledWall = (row, col) => {
    const newGrid = gridState.grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;

    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithToggledWall(row, col);
    setGridState({ ...gridState, grid: newGrid, mousePressed: true });
  };

  const handleMouseEnter = (row, col) => {
    if (!gridState.mousePressed) return;

    const newGrid = getNewGridWithToggledWall(row, col);
    setGridState({ ...gridState, grid: newGrid });
  };

  const handleMouseUp = () => {
    setGridState({ ...gridState, mousePressed: false });
  };

  const visAlgo = (algo) => {
    const grid = gridState.grid;
    const startNode = grid[props.node.x1][props.node.y1];
    const endNode = grid[props.node.x2][props.node.y2];

    const visitedNodesInOrder = getVisitedNodesInOrder(algo, grid, startNode, endNode);
    const nodesInShortestPathOrder = nodeInShortestPathOrder(algo, endNode);

    if(gridState.algoStarted === false) {
      animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  };

  const getVisitedNodesInOrder = (algo, grid, startNode, endNode) => {
    if(algo === "Dijkstra's") {
      return dijkstra(grid, startNode, endNode);
    } else if(algo === "A*") {
      return astar(grid, startNode, endNode);
    }
  };

  const nodeInShortestPathOrder = (algo, endNode) => {
    if(algo === "Dijkstra's") {
      return getNodesInShortestPathOrder(endNode);         // backtrack the end node
    } else if(algo === "A*") {
      return getNodesInShortestPath(endNode);       // backtrack the end node
    }
  };

  const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const generalNode = visitedNodesInOrder[i];
        document.getElementById(
          `node-${generalNode.row}-${generalNode.col}`
        ).className = "node node-visited";
      }, 10 * i);
    }

    const i = visitedNodesInOrder.length;
    setTimeout(() => {
      animateShortestPath(nodesInShortestPathOrder);
    }, 10 * i);
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const resNode = nodesInShortestPathOrder[i];
        document.getElementById(
          `node-${resNode.row}-${resNode.col}`
        ).className = "node node-shortest-path";
      }, 50 * i);
    }

    const len = nodesInShortestPathOrder.length;
    setTimeout(() => {
      setGridState({ ...gridState, algoStarted: false });
    }, 50 * len);
  };

  return (
    <>
      <Navbar
        visAlgo={visAlgo}
        inputEvent={props.inputEvent}
        node={props.node}
        clear={clear}
      />
      <div className="info">
        <h5> Click on the grid to add walls!! </h5>
      </div>
      <div className="grid">
        {gridState.grid.map((currRow, rowIdx) => {
          return (
            <div key={rowIdx}>
              {currRow.map((node, nodeIdx) => {
                const { row, col, isWall, isStart, isFinish } = node;
                return (
                  <Node
                    key={nodeIdx}
                    row={row}
                    col={col}
                    isWall={isWall}
                    isStart={isStart}
                    isFinish={isFinish}
                    handleMouseDown={handleMouseDown}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseUp={handleMouseUp}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Grid;
