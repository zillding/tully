import React, { Component } from "react";
import rangeParser from "parse-numeric-range";
import tcpPortUsed from "tcp-port-used";
import kill from "kill-port";

const isPortInUse = port =>
  tcpPortUsed.check(port, "127.0.0.1").then(inUse => (inUse ? port : 0));

class App extends Component {
  state = {
    value: "3000-3005,8000-8100,9000-9100",
    portsInUse: []
  };

  componentDidMount() {
    this.setPortsInUse();
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  setPortsInUse() {
    const { value } = this.state;

    const ports = rangeParser.parse(value);
    Promise.all(ports.map(isPortInUse))
      .then(values => values.filter(v => v > 0))
      .then(portsInUse => {
        this.setState({ portsInUse });
      });
  }

  render() {
    const { value, portsInUse } = this.state;

    return (
      <div>
        <input value={value} onChange={this.onChange} />
        <button
          onClick={() => {
            this.setPortsInUse();
          }}
        >
          set
        </button>
        {portsInUse.map(port => (
          <div key={port}>
            {port}{" "}
            <button
              onClick={() => {
                kill(port);
              }}
            >
              kill
            </button>
          </div>
        ))}

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
