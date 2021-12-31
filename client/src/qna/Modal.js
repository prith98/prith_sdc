import React, { useState, useContext, useEffect, useRef } from 'react';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';

function Modal ({ handleClose, show, children }, props) {

  const {products, setProducts, currentProductId, setCurrentProductId, cqCopy, setCQCopy, showForm, setShowForm} = useContext(MainContext);
  const showHideClassName = showForm ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={props.handleClose}>
          Close
        </button>
      </section>
    </div>
  );


}

export default Modal;