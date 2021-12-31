import React, { useState, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';
import { Form } from './Form.js';


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

  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  }

  return ReactDOM.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>This is a Modal</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <button className="form-control btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
        <button onClick={() => setShowModal(false)}>Submit Question</button>
      </div>
    </div>,
    document.getElementById("app")
  );


}

export default AddQuestion;

