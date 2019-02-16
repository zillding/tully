import React, { Component } from "react";

class App extends Component {
  state = {
    value: "3000,3001"
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <input value={value} onChange={this.onChange} />
        <button>refresh</button>
        <div>
          3000 <button>kill</button>
        </div>
        <div>
          3001 <button>kill</button>
        </div>

        <style global jsx>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Helvetica, Arial, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol";
          }
        `}</style>
      </div>
    );
  }
}

export default App;
