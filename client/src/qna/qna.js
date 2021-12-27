import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';
import IndividualQandA from '/client/src/qna/IndividualQandA.js';
import SearchQuestions from '/client/src/qna/SearchQuestions.js';

function Qna () {

  const {products, setProducts, currentProductId, setCurrentProductId} = useContext(MainContext);
  const [allQuestions, setAllQuestions] = useState(null);

  let allQuestionsData = [];

  useEffect(() => {
    products.forEach((product) => {
      allQuestionsData.push(axios.get('/qa/questions?product_id=' + product.id).then((result) => { return result.data; }));
    });
    Promise.all(allQuestionsData).then((values) => {
      setAllQuestions(values);
      console.log(values);
    });
  }, []);


  return (
    <MainContext.Provider value={{products, setProducts, currentProductId, setCurrentProductId, allQuestions, setAllQuestions}}>

      <div id="qna">
        <SearchQuestions />
        <IndividualQandA />
      </div>
    </MainContext.Provider>
  );

}

export default Qna;