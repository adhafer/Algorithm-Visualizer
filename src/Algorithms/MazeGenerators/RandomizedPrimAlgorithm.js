import {

  get_frontier_Cells,
  clear_path_Cells,

} from "../AlgoHelper";

export default function RandomizedPrimAlgorithm({
  array,
  height,
  width,
  startCell,
}) {

  
  let grid= array;
  for(let i =0; i< height; i++){
    for (let j =0 ; j < width; j++ ){
        grid[i][j].state.isWall = true; 

        
    }
  }
  let arrays = [];

  // frintiers is an array of cells that are walls;
  let frontiers = [];

  // Choosing a random starting point. 

  let currentCell = startCell;
  currentCell.state.isWall = false;
  frontiers.push(...get_frontier_Cells(grid, currentCell, true));
  
  let  cells_to_process, target_passage,  target_wall, target_wall_index, wall_passages;

  while(!!frontiers.length){

    // Choose an index for a target_wall.
    target_wall_index =  Math.max(Math.floor(Math.random()*frontiers.length)-1 , 0);

    // Choose a random Wall 
    target_wall = frontiers[target_wall_index];
    // Get the passages near the Wall
    wall_passages = get_frontier_Cells(grid, target_wall, false);

    //Check if there are any  passages
    if (!!wall_passages.length){

    // Pick a random passage Cell (a cell that is not a wall for reference).
    target_passage = wall_passages[Math.floor(Math.random()*wall_passages.length)];
   
    // Clear a path between the target_wall and the target_passage and store an array of passage cells.

    cells_to_process = clear_path_Cells(grid, target_wall, target_passage);

    let tem = get_frontier_Cells(grid , cells_to_process[2], true); 
    frontiers.push(...tem);
    tem = get_frontier_Cells(grid , cells_to_process[0], true); 
    frontiers.push(...tem);
    

    }
    arrays.push(grid);
    frontiers.splice(target_wall_index, 1);
    frontiers.splice(frontiers.length-target_wall_index + 18, 1);

  }



  return grid;
}
