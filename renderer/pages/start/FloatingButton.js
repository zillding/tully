import React, { Fragment } from "react";

function FloatingButton({ children, onClick }) {
  return (
    <Fragment>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          outline: none;
          color: #bbb;
        }
        button:hover {
          background-color: #eee;
          color: #4c4c4c;
        }
        button:active {
          background-color: #ddd;
        }
      `}</style>
    </Fragment>
  );
}

export default FloatingButton;
