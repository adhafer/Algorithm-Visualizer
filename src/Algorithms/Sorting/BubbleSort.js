import { Swap } from "../AlgoHelper";


export default  function BubbleSort({data}) {
  
  let temp = [...data.state.array];
  // let te = [...data.state.array];
  let coTemp = [...data.state.colorKey];

  for (let i = 0; i < data.state.count; i++) {
    for (let j = 0; j < data.state.count - 1; j++) {
      if (temp[i] < temp[j]) {

        Swap(temp, coTemp, i, j);

        data.setState({
          arraySteps: [data.state.arraySteps.push(temp.slice())],
          colorSteps: [data.state.colorSteps.push(coTemp.slice())],
          // [[data.state.colorKey],[coTemp]],
        });
        // console.log(data.state.arraySteps, data.state.arraySteps.length)
      }
    }
  }
  data.setState({
    arraySteps: data.state.arraySteps.slice(1),
    colorSteps: data.state.colorSteps.slice(1),
  });


  return (0); 
}

