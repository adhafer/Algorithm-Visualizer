import "./App.css";
import React, { Component } from "react";
import Containers from "./components/Containers.js";
import Cell from "./components/Cell.js";
import Dijkstra from "./Algorithms/PathFinding/Dijkstra";
import Astar from "./Algorithms/PathFinding/Astar";
import MazeGan from "./Algorithms/MazeGenerators/MazeGan";
import RandomizedPrimAlgorithm from "./Algorithms/MazeGenerators/RandomizedPrimAlgorithm";

const PF_ALGORITHMS = ["Dijkstra", "A*"];
const MAZE_GENERATORS =["Depth-First", "Randomised Prim's"]

class App extends Component {
  state = {
    Array: [],
    height: 40,
    width: 80,
    FlippedArray: [],
    startCell: undefined,
    endCell: undefined,
    pfAlgrithm: PF_ALGORITHMS[0],
    mazeAlgrithm: MAZE_GENERATORS[1],
    isMaze: false,

  };

  componentDidMount() {
    this.generateRandomMatrix();
  }

  generateRandomMatrix = () => {
    let h = this.state.height;
    let w = this.state.width;
    let tempArray = [];
    let cell;
    for (let y = 0; y < h; y++) {
      tempArray.push([]);
      for (let x = 0; x < w; x++) {
        cell = new Cell();
        cell.state.x = x;
        cell.state.y = y;

        tempArray[y].push(cell);
      }
    }

    let new_temp = [];
    let tem = [];
    // Creating an empty array with shape of w*h

    for (let y = 0; y < w; y++) {
      tem = [];
      for (let x = 0; x < h; x++) {
        tem.push(0);
      }
      new_temp.push(tem);
    }

    // Tranforming array
    // console.log("new_temp", new_temp)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        new_temp[x][y] = tempArray[y][x];
      }
    }

    this.setState({
      Array: tempArray,
      FlippedArray: new_temp,
      startCell: tempArray[0][0],
      endCell: tempArray[19][78],
      isMaze: false, 
    });
    return true;
  };

  TransformMatrix = () => {
    let h = this.state.height;
    let w = this.state.width;
    let tempArray = this.state.Array;

    let new_temp = [];
    let tem = [];
    // Creating an empty array with shape of w*h

    for (let y = 0; y < w; y++) {
      tem = [];
      for (let x = 0; x < h; x++) {
        tem.push(0);
      }
      new_temp.push(tem);
    }

    // Tranforming array
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        new_temp[x][y] = tempArray[y][x];
      }
    }

    this.setState({
      FlippedArray: new_temp,
    });
  };

  animate = (visitedCellInOrder, cellsInshortestPathOrder) => {
    let array = this.state.Array;
    let vcioLenght = visitedCellInOrder.length;

    for (let i = 0; i < vcioLenght; i++) {
      if (i === vcioLenght - 1) {
        for (let i = 0; i < cellsInshortestPathOrder.length; i++) {
          let row = cellsInshortestPathOrder[i].state.y;
          let col = cellsInshortestPathOrder[i].state.x;
          array[row][col].state.Color = "red";
          array[row][col].state.walls = {"top" : 2, "bottom": 2, "left": 2 , "right": 2};

          
          if(i === 0){
          array[row][col].state.Color = "orange";
          array[row][col].state.walls = {"top" : 3, "bottom": 3, "left": 3, "right": 3};
          }

        }
      }
    }
    return array;
  };

  solving = () => {

    const [arr, shortest] = Dijkstra({
      array: this.state.Array,
      height: this.state.height,
      width: this.state.width,
      startCell: this.state.startCell,
      endCell: this.state.endCell,
    });
    Astar({
      array: this.state.Array,
      height: this.state.height,
      width: this.state.width,
      startCell: this.state.Array[0][0],
      endCell: this.state.Array[1][1],
    });

    let animated = this.animate(arr, shortest);
    this.setState({
      Array: animated,
    });
    this.TransformMatrix();
  };

  selectPFAlgo = (e) => {
    let value = e.target.value;
    
    this.setState({
      pfAlgrithm: value,
    });

  };

  selectMazeGenAlgo = (e) => {
    let value = e.target.value;
    
    this.setState({
      mazeAlgrithm : value
    })
  }

  

  generateMaze = async() => {
    let arr = this.state.Array;
    if(this.state.isMaze === false){
    if(this.state.mazeAlgrithm === MAZE_GENERATORS[0]){
      arr = MazeGan({
        array: this.state.Array, 
        height: this.state.height, 
        width: this.state.width,
        startCell: this.state.startCell, 
      });
      for(let y=0; y < this.state.height; y++){
        for (let x=0; x<this.state.width; x++){
          arr[y][x].state.visited = false; 
        }
      };
    }
    else if (this.state.mazeAlgrithm === MAZE_GENERATORS[1]){
      let arr = RandomizedPrimAlgorithm({
        array: this.state.Array, 
        height: this.state.height, 
        width: this.state.width,
        startCell: this.state.startCell, 
      });
      for(let y=0; y < this.state.height; y++){
        for (let x=0; x<this.state.width; x++){
          arr[y][x].state.Color = arr[y][x].state.isWall === true ? "black": "white" ; 
          arr[y][x].state.walls = arr[y][x].state.Color === "white" ? {"top" : 0, "bottom": 0, "left": 0 , "right": 0} : arr[y][x].state.walls;
          arr[y][x].state.visited = false;
          // console.log(arr[y][x].state.isWall)
        }
      };
      
    }
    
    this.setState({
      Array: arr,
      isMaze: true, 
    })
  } 
  else {

    await new Promise( this.generateRandomMatrix()); 
    this.generateMaze();
    
  }

  }


  render() {
    let b = Containers({
      key:Math.floor(Math.random()*this.state.height + this.state.width),
      array: this.state.Array,
      FlippedArray: this.state.FlippedArray,
      height: this.state.height,
      width: this.state.width,
    });
    let pf_options = PF_ALGORITHMS.map((value, index) => (
      <option value={value} key={Math.floor(Math.random() *index +index)}>{value}</option>
    ));
    let maze_options = MAZE_GENERATORS.map((value, index) => (
      <option value={value} key={Math.floor(Math.random() *index +index)}>{value}</option>
    ));



    return (
      <>
        <div className="tasks_controls">
          <button type="button" onClick={this.solving} className="_btn">
            Solve
          </button>
          <button type="button" onClick={this.generateMaze} className="_btn">
            Maze
          </button>
          
          <input type="number" id="inputNum"></input>
          <select onChangeCapture={this.selectPFAlgo}>{pf_options}</select>
          <select onChangeCapture={this.selectMazeGenAlgo} defaultValue={this.state.mazeAlgrithm}>{maze_options}</select>

        </div>

        <header className="App-header">{b}</header>
      </>
    );
  }
}

export default App;
