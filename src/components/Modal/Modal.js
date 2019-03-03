
// External Libraries
import React, {Fragment} from 'react';

// Internal Components and CSS
import "./Modal.css";

const Modal = props => {
    const {visible, closeModal, children} = props;

    return (visible ? 
        <Fragment>
            <div className="Modal">{children}</div> 
            <div onClick={closeModal} className="Backdrop" />
        </Fragment>
    : null);
}

export default Modal;
