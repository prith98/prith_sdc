import React, { useState, useContext, useEffect, useRef } from 'react';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';

function IndividualQandA () {

  const {products, setProducts, currentProductId, setCurrentProductId, numCurrentQuestions, setNumCurrentQuestions, cqCopy, setCQCopy,
    currentQuestion, questionIDs, setQuestionIDs, currentCount, setCurrentCount,
     setCurrentQuestion, query, setQuery, filteredQuestions, setFilteredQuestions, limitQuestions, setLimitQuestions, showAllQuestions, setShowAllQuestions, qIDAnswer, setqIDAnswer} = useContext(MainContext);
  const [currentAnswers, setCurrentAnswers] = useState(null);

  let currentAnswersData = [];
  let questionIDsArray = [];

  // Get all answers for a specific Question based on questionID
  const getAnswers = function (id) {
    axios
      .get('/qa/questions/' + id.toString() + '/answers')
      .then((results) => {
        return results.data.results
      })
  }

  // Updates the currentQuestion list to show that the YES count has increased
  const updateCPID = function() {
    if (showAllQuestions) {
    axios
      .get('/qa/questions?product_id=' + currentProductId + '&count=100')
      .then((result) => {
        setCurrentQuestion(result.data.results)
        setLimitQuestions(result.data.results);
        setCQCopy(result.data.results);
      })
    } else if (!showAllQuestions) {
      axios
        .get('/qa/questions?product_id=' + currentProductId + '&count=100')
        .then((result) => {
          setCurrentQuestion(result.data.results)
          setLimitQuestions(result.data.results.slice(0, currentCount));
          setCQCopy(result.data.results.slice(0, currentCount));
        })
      }
  }

  // Send a PUT Request for a specific Answer ID to mark it as helpful and increase helpful count on server
  const updateAHelpful = function(e) {
    let aID = e.currentTarget.dataset.id;
    axios
      .put('/qa/answers/' + aID.toString() + '/helpful')
      .then((results) => {
        console.log('Successfully marked answer ' + aID.toString() + ' as helpful');
      })
      .then(() => {updateCPID()})
  }

  // Send a PUT Request for a specific answer ID to mark the question as reported on the database
  const reportAnswer = function(e) {
    let aID = e.currentTarget.dataset.id;
    console.log(aID);
    axios
      .put('/qa/questions/' + aID + '/report')
      .then(() => {
        alert('Reported Answer ' + aID + '.')
      })
      .then(() => {
        updateCPID()
      })
  }


  // Send a PUT Request for a specific Question ID if it was helpful to increase the helpful count on server
  // if user has already marked a question as helpful, will not send a PUT request and alert user that they
  // have already marked this question as helpful
  const updateQHelpful = function(e) {
    let qID = e.currentTarget.dataset.id;
    let questionIDsCopy = questionIDs;
    if (questionIDs[qID]) {
      axios
        .put('/qa/questions/' + qID.toString() + '/helpful')
        .then((results) => {
          console.log('Successfully marked question ' + qID + ' as helpful');
        })
        .then(() => {
          updateCPID()
          console.log(currentProductId)
        })
        .then(() => {
          questionIDsCopy[qID] = false;
          setQuestionIDs(questionIDsCopy);
        })
    } else {
      alert ('You have already marked this question as helpful!');
    }

  }

  const updateQID = function (e) {
    let qID = e.currentTarget.dataset.id
    console.log(qID);
    setqIDAnswer(e.currentTarget.dataset.id);
  }

  useEffect(() => {

    let isMounted = true;
    if (isMounted) {
      limitQuestions && limitQuestions.length && limitQuestions.forEach((question) => {
        currentAnswersData.push(axios.get('/qa/questions/' + question.question_id + '/answers').then((result) => { return result.data; }));
      });
      Promise.all(currentAnswersData).then((values) => {
        setCurrentAnswers(values);
      });
    }

    return () => { isMounted = false };

  }, [currentQuestion]);



  // Will show "LOADING..." until
  // currentQuestion object has been resolved in qna.js
  // and successfully passed down to this component
  if (cqCopy === null) {
    return (
      <div>
        LOADING...
      </div>
    )
  }

  return (

    <div>
      {/* Dynamically renders questions from currentQuestion prop in the format of Question, then Answer, then asker name, date asked, helpful, how many people found it helpful, and report*/}

      {limitQuestions ? limitQuestions.map(oneQuestion => {
        let answerArray = Object.values(oneQuestion.answers);
        let finalAnswers = answerArray.map(oneAnswer => {
          return (
            <div key={oneAnswer.id}>
              <div className="answerBody">A: {oneAnswer.body}</div>
              <div className="answerBottomText">by {oneAnswer.answerer_name}, {oneAnswer.date.slice(0,10)}   |   Helpful? <span className="helpfulYes" data-id={oneAnswer.id} onClick={updateAHelpful}><u>Yes</u></span>({oneAnswer.helpfulness})   |  <span data-id={oneAnswer.id.toString()} className="reportAnswer" onClick={reportAnswer}><u>Report</u></span></div>
            </div>
          );
        });
        return (
          <div key={oneQuestion.question_id} className="individualQA">
            <div>
              Q: {oneQuestion.question_body}
              <span> by {oneQuestion.asker_name}, Date Asked: {oneQuestion.question_date.slice(0, 10)}   |   Helpful? <span className="helpfulYes" data-id={oneQuestion.question_id} onClick={updateQHelpful}><u>Yes</u></span> ({oneQuestion.question_helpfulness})   | <span data-id={oneQuestion.question_id} className="addAnswer" onClick={updateQID}> <u> Add Answer </u></span> </span>
            </div>
            <div id="answers">{finalAnswers}</div>
          </div>
        )
      }): <div>LOADING...</div>}
    </div>
  )

}

export default IndividualQandA;