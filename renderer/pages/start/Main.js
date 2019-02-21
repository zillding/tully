import React, { Component } from "react";
import rangeParser from "parse-numeric-range";
import tcpPortUsed from "tcp-port-used";
import find from "find-process";
import zip from "lodash/zip";

import Item from "./Item";

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
    let portsArray;
    Promise.all(ports.map(isPortInUse))
      .then(values => values.filter(v => v > 0))
      .then(portsInUse => {
        portsArray = portsInUse;
        return Promise.all(
          portsInUse.map(port => find("port", port).then(list => list[0].name))
        );
      })
      .then(names => {
        this.setState({ loading: false, portsInUse: zip(portsArray, names) });
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

    if (!portsInUse.length) {
      return <p>All watching ports are free.</p>;
    }

    return (
      <ul>
        {portsInUse.map(([port, name]) => (
          <Item key={port} name={name} port={port} />
        ))}

        <style jsx>{`
          ul {
            max-height: 300px;
            padding: 0;
            overflow: auto;
            flex: 1;
          }
        `}</style>
      </ul>
    );
  }
}

export default Main;
