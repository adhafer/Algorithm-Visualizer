import React from 'react'
import Square from './Square'
import "./Containers.css"
function Containers({array,FlippedArray, height, width, }) {

    // console.log("the array is" , array);
    // console.log("screen size is :", window.screen.width, window.screen.height)
    // let arr_size = array.length;
    let squares_ouput = FlippedArray.map((subArray, index) =>(
      <div className='row_rect' key={Math.random()* index +index}>{
        subArray.map((cell, position) => (<Square 
            key={position+""+index}
            cell={cell}
            array_size={width}
            />))}
        </div>

    ))
  return (
    <div className='box_holder'>
  
    {squares_ouput}


    </div>
  );
}


export default Containers;