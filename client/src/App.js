import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  fibonacci = React.createRef();
  redisClient = null;
  state = { values: {} };

  componentDidMount() {
    axios.get("/api/values").then(d => {
      console.log(d.data);
      this.setState({ values: d.data });
    });
  }
  onSubmitHandler = () => {
    axios.post("/api/values/add", { index: this.fibonacci.current.value });
  };
  render() {
    const values = { ...this.state.values };
    return (
      <div className="App">
      <h2>
        Multi container on EBS
      </h2>
        <input ref={this.fibonacci} />
        <button onClick={this.onSubmitHandler}>Submit</button>
        {values &&
          Object.keys(values).map(function(k) {
            return (
              <li key={k}>
                <span>{k} ---> </span>
                {values[k]}
              </li>
            );
          })}
      </div>
    );
  }
}

export default App;
