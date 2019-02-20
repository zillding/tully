import React, { Fragment } from "react";
import kill from "kill-port";

import { CloseIcon } from "./icons";

function KillButton({ port }) {
  return (
    <Fragment>
      <button
        onClick={() => {
          kill(port);
        }}
      >
        <CloseIcon />
      </button>

      <style jsx>{`
        button {
          margin-left: 10px;
          padding: 5px;
          background: none;
          border: none;
          display: flex;
          border-radius: 50%;
          outline: none;
        }
        button:hover {
          background-color: #eee;
        }
        button:active {
          background-color: #ddd;
        }
      `}</style>
    </Fragment>
  );
}

export default KillButton;
