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
  });

  useEffect(() => {
    setGridState({ ...gridState, grid: getGrid() });
  }, [props]);

  const getGrid = () => {
    const grid = [];

    for (let row = 0; row < 20; row++) {
      let currRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          row,
          col,
          distance: Infinity,
          fDistance: Infinity,
          hDistance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
          isStart: row === props.node.x1 && col === props.node.y1,
          isFinish: row === props.node.x2 && col === props.node.y2,
        };
        currRow.push(currentNode);
      }
      grid.push(currRow);
    }

    return grid;
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
    setGridState({ grid: newGrid, mousePressed: true });
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
    
    if (algo === "Dijkstra's") {
      const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode); // backtrack the end node
      animate(visitedNodesInOrder, nodesInShortestPathOrder);

    } else if (algo === "A*") {
      const visitedNodesInOrder = astar(grid, startNode, endNode);
      const nodesInShortestPath = getNodesInShortestPath(endNode); // backtrack the end node
      animate(visitedNodesInOrder, nodesInShortestPath);
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
  };

  return (
    <>
      <Navbar
        visAlgo={visAlgo}
        inputEvent={props.inputEvent}
        node={props.node}
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
