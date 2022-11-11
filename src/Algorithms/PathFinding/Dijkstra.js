import {getCellsInShortestPathOrder, updateUnvisitedNeighbors , get_flat_array} from"../AlgoHelper";

export default function Dijkstra({ array, height, width, startCell, endCell }) {
  
  let visitedNodesInOrder = [];
  startCell.state.distance = 0;

  let unvisitedCells = get_flat_array(array);

  // // Getting a flat array w*h  => 1*wh
  // for (let row = 0; row < height; row++) {
  //   for (let col = 0; col < width; col++) {
  //     unvisitedCells.push(array[row][col]);
  //   }
  // }


  //#################################################################
  while (!!unvisitedCells.length) {
    unvisitedCells.sort((x, y) => x.state.distance - y.state.distance);

    let closeCell = unvisitedCells.shift();

    if (closeCell.state.distance === Infinity) {
      console.log("closeCell.state.distance === Infinity");
      let cellInshortestPathOrder = getCellsInShortestPathOrder(endCell);
      return [visitedNodesInOrder, cellInshortestPathOrder];
    }

    closeCell.state.visited = true;
    // closeCell.state.Color = "red";
    visitedNodesInOrder.unshift(closeCell);

    if (closeCell === endCell) {
      console.log("closeCell === endCell");
      let cellInshortestPathOrder = getCellsInShortestPathOrder(endCell);
      return [visitedNodesInOrder, cellInshortestPathOrder];
    }
    updateUnvisitedNeighbors(closeCell, array, height, width, "pf");
  }
}
