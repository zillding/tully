import React, { Fragment } from "react";

function Settings({ value, onChangeValue }) {
  return (
    <Fragment>
      <textarea value={value} onChange={e => onChangeValue(e.target.value)} />
      <style jsx>{`
        textarea {
          width: 100%;
          margin: 10px;
        }
      `}</style>
    </Fragment>
  );
}

export default Settings;
