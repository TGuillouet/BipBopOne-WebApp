import React from "react";

/**
 *
 * @param {React.Props} props
 * @param {React.Ref} ref
 * @returns {React.RefForwardingComponent}
 * @constructor
 */
function Select(props, ref) {
  return (
    <div className="select">
      <select name={props.name} ref={ref} defaultValue={props.defaultValue} placeholder={props.placeholder}>
        {props.children}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
