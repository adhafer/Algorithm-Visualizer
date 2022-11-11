import "./SortingApp.css";
import React, { Component } from "react";
import Bar from "./components/Bar.js";
import BubbleSort from "./Algorithms/Sorting/BubbleSort";
import SelectionSort from "./Algorithms/Sorting/SelectionSort";
import InsertionSort from "./Algorithms/Sorting/InsertionSort";

const algorithms = ["Bubble Sort", "Insertion Sort", "Selection Sort"];
let interval;
class SortingApp  extends Component  {
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: this.props.count,
    delay: 50,
    algorithm: algorithms[0],
    timeouts: [],
    upper_number: 400,
    lower_number: 200,
  };

  componentDidMount() {
    this.generateRandomArray();
  }
  generateRandomNumber = (min, max) => {
    var co =
      "rgba(" +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      "," +
      1 +
      ")";

    return [Math.floor(Math.random() * (max - min) + min), co];
  };
  generateRandomArray = () => {
    const count = this.state.count;
    const temp = [];
    const coTemp = [];

    const min_num = this.state.lower_number ? this.state.lower_number : 20;
    const max_num = this.state.upper_number ? this.state.upper_number : 200;

    for (let i = 0; i < count; i++) {
      var genOutput = this.generateRandomNumber(min_num, max_num);
      temp.push(genOutput[0]);
      coTemp.push(genOutput[1]);
    }
    this.setState({
      array: temp,
      arraySteps: [temp],
      colorKey: coTemp,
      colorSteps: [coTemp],
    });
  };

  setCount = () => {
    for (let i = 0; i < 3; i++) {
      var elm = document.getElementById("inputNum").value;
      if (elm >= 3) {
        this.setState({ count: elm });
      }
    }
    console.log("done");
    setTimeout(() => {
      this.generateRandomArray();
    }, 10);
  };

  RunSteps = () => {
    interval = setInterval(() => {
      this.nextARRAY();
    }, this.state.delay);
  };
  selectAlgo = (e) => {
    this.setState({
      algorithm: e.target.value,
    });
  };

  handleSorting = () => {
    switch (algorithms.indexOf(this.state.algorithm)) {
      case 0:
        BubbleSort({ data: this });
        break;
      case 1:
        InsertionSort({ data: this });
        break;

      case 2:
        SelectionSort({ data: this });
        break;
      default:
        this.setState({
          algorithm: algorithms[0],
        });
        BubbleSort({ data: this });
    }
  };

  nextARRAY = () => {
    if (this.state.arraySteps.length >= 1) {
      this.setState({
        array: [...this.state.arraySteps[0]],
        colorKey: [...this.state.colorSteps[0]],
      });

      this.setState({
        arraySteps: this.state.arraySteps.slice(1),
        colorSteps: this.state.colorSteps.slice(1),
      });
    } else {
      clearInterval(interval);
    }
  };
  
  render() {
    let bars = this.state.array.map((value, index) => (
      <Bar
        key={index}
        index={index}
        length={value}
        color={this.state.colorKey[index]}
        max_number={this.state.upper_number}
        min_number={this.state.lower_number}
        quantity={this.state.count}
      />
    ));
    let options = algorithms.map((value, index) => (
      <option value={value}>{value}</option>
    ));

    return (
      <div className="App">
        <header className="App-header">{bars}</header>
        <div className="tasks_controls">
          <button type="button" onClick={this.handleSorting} className="_btn">
            Sort
          </button>
          <button
            type="button"
            onClick={this.generateRandomArray}
            className="_btn"
          >
            Shuffle
          </button>
          <button type="button" onClick={this.setCount} className="_btn">
            Set
          </button>
          <button type="button" onClick={this.RunSteps} className="_btn">
            Next
          </button>
          <input type="number" id="inputNum" ref={this.state.inputRef}></input>
          <select onChangeCapture={this.selectAlgo}>{options}</select>
        </div>
      </div>
    );
  }
}

export default SortingApp;
