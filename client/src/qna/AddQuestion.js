import React, { useState, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';

function AddQuestion () {

  const {products, setProducts, currentProductId, setCurrentProductId, cqCopy, setCQCopy, showModal, setShowModal} = useContext(MainContext);

  const modalRef = useRef();

  const openModal = function () {
    setShowModal(true);
  }

  const closeModal = function (e) {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  }

  return ReactDOM.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>This is a Modal</h2>
        <button onClick={() => setShowModal(false)}>Add A Question</button>
      </div>
    </div>,
    document.getElementById("app")
  );


}

export default AddQuestion;

