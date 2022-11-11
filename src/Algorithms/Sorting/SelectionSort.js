import { Swap } from "../AlgoHelper";

export default  function SelectionSort({data}) {
  
    let temp = [...data.state.array];
    // let te = [...data.state.array];
    let coTemp = [...data.state.colorKey];
    
    for (let i = 0; i < data.state.count; i++) {
        var small_indx  = i ;
        var prev_small =  i 
        for (let j = i+1; j < data.state.count ; j++) {
            if (temp[j] < temp[small_indx]) {

                small_indx = j ;
            }
        }
        if (prev_small !== small_indx) {
            Swap(temp,coTemp, small_indx, i)

            data.setState({
                arraySteps: [data.state.arraySteps.push(temp.slice())],
                colorSteps: [data.state.colorSteps.push(coTemp.slice())],
                // [[data.state.colorKey],[coTemp]],
              });
        }
    
    }
    data.setState({
      arraySteps: data.state.arraySteps.slice(1),
      colorSteps: data.state.colorSteps.slice(1),
    });
  
    return (0); 
  }