import React from "react";
import "./Square.css";
import { get_color } from "./componentsHelper";

export default function Square({ cell, array_size }) {
  let square_size = Math.floor((window.visualViewport.width *0.82 ) / array_size);
  
  let colors = [
  get_color(cell.state.walls["top"]),
  get_color(cell.state.walls["right"]),
  get_color(cell.state.walls["bottom"]),
  get_color(cell.state.walls["left"]),

  ] 


  const squareStyle = {
    width: `${square_size -2}px`,
    height: `${square_size -2}px`,
    backgroundColor: cell.state.Color,
    borderStyle: "solid",
    borderColor: ` ${colors[0]} ${colors[1]} ${colors[2]} ${colors[3]} `, 
    borderWidth: `${1}px`,
    display: "inline-grid",

  };

  return <div className="square" style={squareStyle}></div>;
}
