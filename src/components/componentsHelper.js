import React from 'react'

export  function componentsHelper() {
  return (
    <div>componentsHelper</div>
  )
}


export function get_color(color_key ){

    if (color_key === 0) return "white";
    if (color_key === 1) return "black";
    if (color_key === 2) return "red";
    if (color_key === 3) return "orange";

}