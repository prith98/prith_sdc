import React, { useState } from 'react';
import Axios from 'axios';
import contexts from './contexts/contexts.js';
import Overview from './overview/overview.js';
import Qna from './qna/qna.js';
import Rnr from './rnr/rnr.js';

const App = () => {
  const [products, setProducts] = useState(null);
  const [qna, setQna] = useState(null);
  const [rnr, setRnr] = useState(null);
  const [cart, setCart] = useState(null);

  let endPoints = ['/products', '/qa/questions', '/reviews/', '/cart'];
  let getRequests = [];
  let setStatements = [setProducts, setQna, setRnr, setCart];
  let count = -1;

  getRequests = endPoints.map((endpoint) => {
    count++;
    return Promise(Axios.get(endpoint).then((result) => { let func = setStatements[count]; func(result.data); }))
  });

  useEffect(() => {
    Promise.all(getRequests);
  }, []);

  if (cart == null) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='main'>
    <contexts.overviewContext.Provider value={{products, setProducts, cart, setCart}}>
      <Overview />
    </contexts.overviewContext.Provider>

    <contexts.qnaContext.Provider value={{qna, setQna}}>
      <Qna />
    </contexts.qnaContext.Provider>

    <contexts.rnrContext.Provider value={{rnr, setRnr}}>
      <Rnr />
    </contexts.rnrContext.Provider>
    </div>
  );
};