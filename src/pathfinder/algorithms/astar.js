export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.hDistance = manhattanDistance(startNode, finishNode);
  startNode.fDistance = startNode.distance + startNode.hDistance;
  const unvisitedNodes = getAllNodes(grid);

  while (!!unvisitedNodes.length) {
    sortNodesByFdistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall && closestNode !== startNode && closestNode !== finishNode) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
}

function sortNodesByFdistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.fDistance - nodeB.fDistance);
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.hDistance = manhattanDistance(neighbor, finishNode);
    neighbor.fDistance = neighbor.distance + neighbor.hDistance;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
}

function manhattanDistance(nodeOne, nodeTwo) {
  // Heuristic function
  let xOne = nodeOne.row;
  let xTwo = nodeTwo.row;
  let yOne = nodeOne.col;
  let yTwo = nodeTwo.col;

  let xChange = Math.abs(xOne - xTwo);
  let yChange = Math.abs(yOne - yTwo);

  return xChange + yChange;
}

export function getNodesInShortestPath(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
