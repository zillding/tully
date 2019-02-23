import React from "react";
import Textarea from "react-textarea-autosize";
import css from "styled-jsx/css";

const { className, styles } = css.resolve`
  textarea {
    width: 100%;
    font-size: inherit;
    resize: none;
    box-sizing: border-box;
    border-radius: 4px;
  }
`;

function Settings({ value, onChangeValue }) {
  return (
    <div>
      <h2>Watching ports</h2>
      <Textarea
        className={className}
        autoFocus
        maxRows={10}
        value={value}
        onChange={e => onChangeValue(e.target.value)}
      />

      {styles}
      <style jsx>{`
        div {
          flex: 1;
          padding: 10px;
        }
        h2 {
          text-align: center;
          margin-top: 0;
        }
      `}</style>
    </div>
  );
}

export default Settings;
