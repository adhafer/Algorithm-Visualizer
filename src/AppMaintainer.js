import React,{Component} from 'react';
import App from './App';
import SortingApp from './SortingApp';
import "./AppMaintainer.css";

const ALL_modes =["Pathfinding", "Sorting"];
const PF_ALGORITHMS = ["Dijkstra", "A*"];


export default class AppMaintainer extends Component {
    state = {
        mode: ALL_modes[0],
        pfAlgrithm: PF_ALGORITHMS[0],
        
    };


    selectMode = (e) => {
        this.setState({
            mode: ALL_modes[e.target.value],
        })
    }


    selectPFAlgo = (e) => {
        let value = e.target.value;
        
        this.setState({
          pfAlgrithm: value,
        });
    
      };
    
    render(){
    const code = () =>{
        let output;
        if (this.state.mode === ALL_modes[0]){
            output =<App />;
        }
        else if (this.state.mode === ALL_modes[1]){
            output =<SortingApp 
            count={20}/>;
        }
        return output
    } 


    return ( 

    <div>
    <div className='mainA'>
    <div className='_header'>
    <button className="title" onClick={this.selectMode} value={1} >Sorting Visualizer </button>
    <button className="title" onClick={this.selectMode} value={0} >Pathfinding Visualizer </button>
    </div>

    </div>
    {code()}
    </div>
    
    
    )};
}

