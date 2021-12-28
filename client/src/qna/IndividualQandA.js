import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';

function IndividualQandA () {

  const {products, setProducts, currentProductId, setCurrentProductId, allQuestions, setAllQuestions, currentQuestion, setCurrentQuestion} = useContext(MainContext);

  useEffect(() => {

  }, []);

  // console.log(allQuestions);
  console.log(currentQuestion);

  // Will show "LOADING..." until
  // currentQuestion object has been resolved in qna.js
  // and successfully passed down to this component
  if (currentQuestion === null) {
    return (
      <div>
        LOADING...
      </div>
    )
  }

  return (
    <div>
      {/* Dynamically renders questions from currentQuestion prop in the format of Question, then Answer, then asker name, date asked, helpful, how many people found it helpful, and report*/}
      {currentQuestion.map(oneQuestion => (
        <div key={oneQuestion.question_id}>
          <div>Q: {oneQuestion.question_body}</div>
          <div>A: Generic Answer</div>
          <div>by {oneQuestion.asker_name}, {oneQuestion.question_date.slice(0, 10)}   |   Helpful? <u class="yes-underline">Yes</u> ({oneQuestion.question_helpfulness})   |   <u class="report-underline">Report</u></div>
        </div>
      ))}
    </div>
  )

}

export default IndividualQandA;