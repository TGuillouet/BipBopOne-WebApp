import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalDiv = document.getElementById("app-modal");

function Modal(props) {
    const close = () => {
        props.onClose();
    };

    const classes = "modal" + ((props.isActive)? " is-active":  "");
    return createPortal(
      (
        <div className={classes}>
          <div className="modal-background" />
          <div className="modal-content">
              {props.children}
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={close} />
        </div>
      ),
      modalDiv
    );
}

Modal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
