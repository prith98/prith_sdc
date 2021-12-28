import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';

function IndividualQandA () {

  const {products, setProducts, currentProductId, setCurrentProductId, allQuestions, setAllQuestions, currentQuestion, setCurrentQuestion} = useContext(MainContext);

  useEffect(() => {

  }, []);


  if (allQuestions === null) {
    return (
      <div>
        LOADING...
      </div>
    )
  }

  return (
    <div>
      {allQuestions.map(oneQuestion => (
        <div key={oneQuestion.product_id}>
          <div>Q: {oneQuestion.results[0].question_body}</div>
        </div>
      ))}
    </div>
  )

}

export default IndividualQandA;