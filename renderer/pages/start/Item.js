import React from "react";

import KillButton from "./KillButton";

function Item({ name, port }) {
  return (
    <li>
      <span>{name}</span>
      <span>{port}</span>
      <KillButton port={port} />

      <style jsx>{`
        li {
          padding: 0 28px;
          display: flex;
          align-items: center;
        }
        li:hover {
          background-color: #000;
          color: #fff;
        }
        li:not(:last-child) {
          border-bottom: 1px solid #eee;
        }
        span:first-of-type {
          margin: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          text-align: center;
        }
        span:last-of-type {
          flex: 0 0 52px;
          text-align: end;
        }
      `}</style>
    </li>
  );
}

export default Item;
