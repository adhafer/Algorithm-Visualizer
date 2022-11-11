

export function getUnvisistedNeighbors(cell, grid, height, width, usage) {
    let neighbors = [];
  
    let row = cell.state.y;
    let col = cell.state.x;
    // let gridHeightLength = grid.length;
  
    if (row > 0) {
      neighbors.push(grid[row - 1][col]);
    }
    if (row < height - 1) {
      neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
      neighbors.push(grid[row][col - 1]);
    }
    if (col < width - 1) {
      neighbors.push(grid[row][col + 1]);
    }
    if(usage==="pf"){
      return check_walls(cell, neighbors.filter((neighbors) => !neighbors.state.visited)) 
    }
    else{
      return  neighbors.filter((neighbors) => !neighbors.state.visited);
    }
  }
  
  export function updateUnvisitedNeighbors(cell, grid, height, width, usage ) {
    let unVisitedNeighbors = getUnvisistedNeighbors(cell, grid, height, width,usage);
  
    for (let i = 0; i < unVisitedNeighbors.length; i++) {
      unVisitedNeighbors[i].state.distance = cell.state.distance + 1;
      unVisitedNeighbors[i].state.previousCell = cell;
    }
  }
  
  export function getCellsInShortestPathOrder(endCell) {
    let cellInshortestPathOrder = [];
    let currentCell = endCell;
    while (currentCell !== undefined) {
      cellInshortestPathOrder.unshift(currentCell);
      currentCell = currentCell.state.previousCell;
    }
    return cellInshortestPathOrder;
  }
  
  
  export function check_walls(cell, neighbors){
    let new_neighbors= [];
    
    for(let i =0; i<neighbors.length; i++){
      
      let sy= cell.state.y - neighbors[i].state.y; 
      let sx= cell.state.x - neighbors[i].state.x; 
      
      if(cell.state.x === neighbors[i].state.x){
        if( cell.state.walls["top"] === 0 &&  neighbors[i].state.walls["bottom"] === 0  && sy === 1 ){
          new_neighbors.push(neighbors[i]);
        }
        
        if( cell.state.walls["bottom"] === 0 &&  neighbors[i].state.walls["top"] === 0  && sy === -1 ){
          new_neighbors.push(neighbors[i]);
        }
      }
      
      if(cell.state.y === neighbors[i].state.y){
        if( cell.state.walls["right"] === 0 &&  neighbors[i].state.walls["left"] === 0  && sx === -1 ){
          new_neighbors.push(neighbors[i]);
        }
        
        if( cell.state.walls["left"] === 0 &&  neighbors[i].state.walls["right"] === 0  && sx === 1 ){
          new_neighbors.push(neighbors[i]);
        }
      }
  
    }
    // console.log("new_neighbors :: " ,new_neighbors , "  neightbors : ",neighbors);
    return new_neighbors;
  }


  
export function removewalls(currentCell, nextCell){
    let sx = currentCell.state.x -nextCell.state.x; 
    let sy = currentCell.state.y -nextCell.state.y;

    if(sx === 1){
        currentCell.state.walls["left"] = 0;
        nextCell.state.walls["right"] = 0;
    }
    
    if(sx === -1){
        currentCell.state.walls["right"] = 0;
        nextCell.state.walls["left"] = 0;
    }
    
    if(sy === 1){
        currentCell.state.walls["top"] = 0;
        nextCell.state.walls["bottom"] = 0;
    }
    
    if(sy === -1){
        currentCell.state.walls["bottom"] = 0;
        nextCell.state.walls["top"] = 0;
    }
}

export function get_neighboring_Walls(grid, cell, isWall){
  let neighbors = [];
  let row = cell.state.y;
  let col = cell.state.x;
  let height = grid.length; 
  let width = grid[0].length;

  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < height - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < width - 1) {
    neighbors.push(grid[row][col + 1]);
  }

  if(isWall === true){
    return neighbors.filter(nei => nei.state.isWall);
  }
  else{
    return neighbors;
  }


}

export function get_flat_array(array){
  let flat_array = [];
  let height  = array.length; 
  let width = array[0].length;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      flat_array.push(array[row][col]);
    }
  }
  return flat_array;
}


export function set_isWall(grid, var_state){
  let height  = grid.length; 
  let width = grid[0].length;
  console.log("height :: " , height , "width :: ", width)
  for(let i =0; i< height; i++){
    for (let j =0 ; j < width; j++ ){
        grid[i][j].state.isWall = true; 
        // console.log(grid[i][j].state.isWall);
    }
  }
  return grid; 
}



export function get_frontier_Cells(grid, cell, isWall){
  let frontiers = [];
  // console.log("cell  :: ", cell);
  let row = cell.state.y;
  let col = cell.state.x;
  let height = grid.length; 
  let width = grid[0].length;

  //
  if (row > 1) {
    frontiers.push(grid[row - 2][col]);
  }
  if (row < height - 2) {
    frontiers.push(grid[row + 2][col]);
  }
  if (col > 1) {
    frontiers.push(grid[row][col - 2]);
  }
  if (col < width - 2) {
    frontiers.push(grid[row][col + 2]);
  }
  // console.log("frontiers not filtered :: ", frontiers) 
 
  // A wall 
  if(isWall === true){
    return frontiers.filter(frnt => frnt.state.isWall===true  );
  }

  // Not a wall 
  else if(isWall === false){
    return frontiers.filter(frnt => frnt.state.isWall === false && frnt.state.visited === false );

  }
  else if(isWall === undefined){
    console.log("asd");
    return frontiers.filter(frnt => frnt.state.isWall === true   );
    

  }
}




export function clear_path_Cells(array, startCell, targetCell){
  // console.log("startCell :: ", startCell, " targetCell :: ", targetCell)
  let to_return =[];
  if(startCell === targetCell | startCell === undefined){
    console.log("startCell === targetCell| startCell === undefined");
    console.log("startCell :: ", startCell , "  targetCell :: " , targetCell )
    return;
  }
  let x = startCell.state.x;
  let y = startCell.state.y;
  // console.log("x :: ", x , "  y :: ", y);
  targetCell.state.isWall = false;
  to_return.push(startCell)
  // up and down 
  
  if(startCell.state.x === targetCell.state.x){
    let dy = startCell.state.y- targetCell.state.y;  
    // console.log("dy :: ", dy);

    if (dy >0){
      for(let i = 0; i<dy&& y-i >= 0; i++){
        array[y-i][x].state.isWall = false;
        // array[y-i][x].state.visited = true;
        to_return.push(array[y-i][x])
      }  
    }

    if (dy < 0 ){
      for(let i = 0; i<-dy; i++){
        // console.log("array[y-i][x]", y-i, x);
        array[y+i][x].state.isWall = false;

        // array[y+i][x].state.visited = true 
        to_return.push(array[y+i][x])

      } 
    }
  }

  // left and right

  else if(startCell.state.y === targetCell.state.y){
    let dx = startCell.state.x- targetCell.state.x;  
    // console.log("dx :: ", dx);
    if (dx > 0 ){
      for(let i = 0; i<dx; i++){
        array[y][x-i].state.isWall = false;

        // array[y][x-i].state.visited = true; 
        to_return.push(array[y][x-i])

      }  
    }

    if (dx < 0 ){
      for(let i = 0; i<-dx; i++){
        // console.log("array[y][x+i]", y, x+i);
        array[y][x+i].state.isWall = false;

        // array[y][x+i].state.visited = true;
        to_return.push(array[y][x+i])

      } 
    }
  }

  // for(let i in to_return){
  //   to_return[i].state.visited = true;
  // }
  to_return[0].state.visited = false;
  to_return[1].state.visited = false; 
  to_return[2].state.visited =  true;
  return to_return
}


export function get_distance(currentCell, targetCell){
  let dx = Math.max(currentCell.state.x-targetCell.state.x, -currentCell.state.x+targetCell.state.x); 
  let dy = Math.max(currentCell.state.y-targetCell.state.y, -currentCell.state.y+targetCell.state.y);

  console.log(Math.round(10 * Math.sqrt(Math.pow(dx,2)+ Math.pow(dy,2))))
}

export function get_surrounding_cells(grid, cell, startCell, endCell){
  let surroundingCells = [];
  let row = cell.state.y;
  let col = cell.state.x;
  let height = grid.length; 
  let width = grid[0].length;

  // top cell
  if (row > 0) {
    surroundingCells.push(grid[row - 1][col]);
  }
  // bottom cell 
  if (row < height - 1) {
    surroundingCells.push(grid[row + 1][col]);
  }
  // left cell 
  if (col > 0) {
    surroundingCells.push(grid[row][col - 1]);
  }
  // right cell 
  if (col < width - 1) {
    surroundingCells.push(grid[row][col + 1]);
  }

  // top left
  if (row > 0 & col >0 ){
    surroundingCells.push(grid[row-1][col-1])
  }
  // top right
  if (row > 0 & col < width - 1 ){
    surroundingCells.push(grid[row-1][col + 1 ])
  }
  // bottom left
  if (row < width - 1 & col > 0 ){
    surroundingCells.push(grid[row+1][col - 1])
  }
  // bottom left
  if (row < width - 1 & col < height- 1 ){
    surroundingCells.push(grid[row+1][col + 1])
  }
  // cost holder - temps
  return surroundingCells.filter(sCell => sCell.state.h_cost === Infinity);
}

export function calculate_G_H_F(cells, startCell , endCell){

  for(let i in  cells){
    if ( cells[i].state.h_cost === Infinity){
      cells[i].state.g_cost = get_distance(cells[i], startCell);
      cells[i].state.h_cost = get_distance(cells[i], endCell); 
      cells[i].state.f_cost = cells[i].state.h_cost +cells[i].state.g_cost ;
    }
  }
}


export function Swap(num_array,color_array, i , j ) {
    
  let a = num_array[i];
  let b = num_array[j];
  num_array[i] = b;
  num_array[j] = a;

  //color swap
  a = color_array[i];
  b = color_array[j];
  color_array[i] = b;
  color_array[j] = a;
  
}
