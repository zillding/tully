import React, { Component } from "react";
import rangeParser from "parse-numeric-range";
import tcpPortUsed from "tcp-port-used";

import KillButton from "./KillButton";

const isPortInUse = port =>
  tcpPortUsed.check(port, "127.0.0.1").then(inUse => (inUse ? port : 0));

class Main extends Component {
  state = {
    loading: true,
    portsInUse: []
  };

  componentDidMount() {
    this.setPortsInUse();
  }

  setPortsInUse() {
    const { value } = this.props;

    const ports = rangeParser.parse(value);
    Promise.all(ports.map(isPortInUse))
      .then(values => values.filter(v => v > 0))
      .then(portsInUse => {
        this.setState({ loading: false, portsInUse });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, portsInUse } = this.state;

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <ul>
        {portsInUse.map(port => (
          <li key={port}>
            {port}
            <KillButton port={port} />
          </li>
        ))}

        <style jsx>{`
          ul {
            padding: 0;
          }
          li {
            display: flex;
            align-items: center;
          }
        `}</style>
      </ul>
    );
  }
}

export default Main;
