import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';

function IndividualQandA () {

  const {products, setProducts, currentProductId, setCurrentProductId, allQuestions, setAllQuestions, currentQuestion, setCurrentQuestion} = useContext(MainContext);
  const [currentAnswers, setCurrentAnswers] = useState(null);
  const [currentProductAnswer, setCurrentProductAnswer] = useState(null);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState(null);
  let currentAnswersData = [];

  // console.log(currentQuestion);
  // console.log(currentProductId)

  const getAnswers = function (id) {
    axios
      .get('/qa/questions/' + id.toString() + '/answers')
      .then((results) => {
        return results.data.results
      })
  }

  useEffect(() => {
    currentQuestion && currentQuestion.length && currentQuestion.forEach((question) => {
      currentAnswersData.push(axios.get('/qa/questions/' + question.question_id + '/answers').then((result) => { return result.data; }));
    });
    Promise.all(currentAnswersData).then((values) => {
      setCurrentAnswers(values);
    });
  }, [currentQuestion]);


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
      {currentQuestion.map(oneQuestion => {
        // console.log(Object.values(oneQuestion.answers))
        // let answers = getAnswers(oneQuestion.question_id)
        let answerArray = Object.values(oneQuestion.answers);
        let finalAnswer = answerArray.map(oneAnswer => {
          return (
            <div key={oneAnswer.id}>
              <div>A: {oneAnswer.body}</div>
            </div>
          );
        });
        console.log(finalAnswer);
        return (
          <div key={oneQuestion.question_id}>
            <div>
              Q: {oneQuestion.question_body}
              <span> by {oneQuestion.asker_name}, Date Asked: {oneQuestion.question_date.slice(0, 10)}   |   Helpful? <u class="yes-underline">Yes</u> ({oneQuestion.question_helpfulness})   |   <u class="report-underline"> Add Answer </u> </span>
            </div>
            <div id="answers">{finalAnswer}</div>
            <div>by</div>
          </div>
        )
      })}
    </div>
  )

}

export default IndividualQandA;