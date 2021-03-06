import React, { Component } from "react";

import { SettingsIcon, CloseIcon } from "./icons";
import FloatingButton from "./FloatingButton";
import Main from "./Main";
import Settings from "./Settings";

class App extends Component {
  state = {
    showSettings: false,
    value: "3000-3005,8000-8100,9000-9100"
  };

  onChangeValue = value => {
    this.setState({ value });
  };

  render() {
    const { showSettings, value } = this.state;

    return (
      <div className="root">
        {showSettings && (
          <Settings value={value} onChangeValue={this.onChangeValue} />
        )}
        {!showSettings && <Main value={value} />}
        <FloatingButton
          onClick={() => {
            this.setState(({ showSettings }) => ({
              showSettings: !showSettings
            }));
          }}
        >
          {showSettings ? <CloseIcon /> : <SettingsIcon />}
        </FloatingButton>
        <style jsx>{`
          .root {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          }
        `}</style>

        <style global jsx>{`
          html,
          body,
          #__next,
          .root {
            height: 100%;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Helvetica, Arial, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol";
            margin: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default App;
