import React from "react";
import "./Bar.css";

function Bar({ index, length, color, max_number, min_number , quantity}) {

  const right_left = {
    height: `${length}px`,
    background: `${color}`,
    position: "relative",
    color: "black",
    margin: `0 0 0 ${0.3}vw `,
    bottom: `${0}px`,
    width: `${Math.min(window.screen.width/quantity-(quantity/10),30)}px`,
    // width: `${Math.min(window.screen.width/quantity,20)}px`,
    display: "flex",
    transition: `${1}s transform`,
  };

  console.log(Math.floor((window.visualViewport.width) / (quantity)));

  const outer = {
    height: `${max_number}px`,
    bottom: `${0}%`,
    position: "absulote",
    float: "right",
    display: "flex",
    alignItems: "flex-end",
  };


  return (
    <>
      <div style={outer}>
        <div style={right_left}></div>
      </div>
    </>
  );
}

export default Bar;
