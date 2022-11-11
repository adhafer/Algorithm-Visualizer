import React, {Component} from 'react'

class Cell extends Component{
    
  state  = {
    x: 0,
    y: 0, 
    walls: {"top" : 1, "bottom": 1, "left": 1 , "right": 1},
    visited: false, 
    previousCell: undefined, 
    distance: Infinity,
    Color: "white",
    isWall: false,
    f_cost: Infinity, ///  distance from the end node 
    g_cost: Infinity, /// distance from the start node
    h_cost: Infinity, /// g_cost + f_cost
   }

  coords = () => {
      return(this.state.x,this.state.y);
   };



  render(){
    return (
    <div>Cell</div>
  );
    }
}

export default Cell ;