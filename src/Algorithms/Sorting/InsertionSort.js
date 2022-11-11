import { Swap } from "../AlgoHelper";

export default function InsertionSort({data}) {
    
    let temp = [...data.state.array];

    let coTemp = [...data.state.colorKey];
    
    for (let i = 1; i < data.state.count; i++) {
        var target = temp[i];
        var target_color = coTemp[i];

        var tra_index = i - 1;  
        while (tra_index >= 0 && target < temp[tra_index]){

            // temp[tra_index + 1] = temp[tra_index]
            // coTemp[tra_index+1] = coTemp[tra_index]
            Swap(temp,coTemp, tra_index+1, tra_index )
            data.setState({
              arraySteps: [data.state.arraySteps.push(temp.slice())],
              colorSteps: [data.state.colorSteps.push(coTemp.slice())],
            });
      
            tra_index -= 1 ;

        }

        temp[tra_index +1 ] = target;
        coTemp[tra_index +1 ] = target_color;

    
    
    }
    data.setState({
      arraySteps: data.state.arraySteps.slice(1),
      colorSteps: data.state.colorSteps.slice(1),
    });
  
  return (0)
}
