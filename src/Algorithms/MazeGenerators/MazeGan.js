import {getUnvisistedNeighbors, removewalls} from  "../AlgoHelper";


export default function MazeGan({array,height, width, startCell}) {
// Iterative Implementation.
    
    let nextCell; 
    let unvisitedNeighbors=[];
    let currentCell = startCell; 
    currentCell.state.visited = true; 
    let stack =[];
    stack.push(currentCell);

    while(!!stack.length){
        currentCell = stack.shift();
        // Check if current cell has any neighbors that have not been visited
        unvisitedNeighbors = getUnvisistedNeighbors(currentCell, array, height, width);
        if(!!unvisitedNeighbors.length){
            stack.push(currentCell);
            nextCell = unvisitedNeighbors[Math.floor(Math.random()*unvisitedNeighbors.length  )]
            removewalls(currentCell, nextCell);
            nextCell.state.visited = true;
            stack.push(nextCell);
        } 
    }

    return array 
}


 