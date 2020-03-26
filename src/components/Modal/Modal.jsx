import React from "react";
import PropTypes from "prop-types";

function Modal(props) {
    const close = () => {
        props.onClose();
    };

    const classes = "modal" + ((props.isActive)? " is-active":  "");
    return (
      <div className={classes}>
          <div className="modal-background" />
          <div className="modal-content">
              {props.children}
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={close} />
      </div>
    );
}



export default Modal;
