import React, { useState, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';
// import { Form } from './Form.js';


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
    let payload = {
      "body": event.target.qnaFormQuestion.value,
      "name": event.target.nickname.value,
      "email": event.target.email.value,
      "product_id": currentProductId
    }
    axios
      .post('/qa/questions', payload)
      .then(() => {
        console.log('Submitted Question')
        alert('Submitted Question')
      })
      .catch((err) => {
        console.log(err);
      })
    // alert('Your question has been submitted')
  }

  return ReactDOM.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2 id="formQF">Question Fields</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="question">Question (MANDATORY FIELD)</label>
            <input className="form-control" id="qnaFormQuestion" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="nickname">Nickname (MANDATORY FIELD)</label>
            <input
              type="nickname"
              className="form-control"
              id="nickname"
              placeholder="jackson11!"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address (MANDATORY FIELD)</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Why did you like this product or not?"
            />
          </div>
          <input type="submit" value="SubmitQuestion"></input>
        </form>
      </div>
    </div>,
    document.getElementById("app")
  );


}

export default AddQuestion;

