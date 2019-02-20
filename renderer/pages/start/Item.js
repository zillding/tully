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
          display: flex;
          align-items: center;
        }
        span {
          margin-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span:nth-child(2) {
          flex-shrink: 0;
        }
      `}</style>
    </li>
  );
}

export default Item;
