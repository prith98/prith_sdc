import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js';
import Axios from 'axios';
import Reviews from './components/reviews/reviews.js';
import Ratings from './components/ratings/ratings.js';

function Rnr() {
  const {products, setProducts, currentProduct, setCurrentProduct} = useContext(MainContext);

  return(
    <MainContext.Provider value={{products, setProducts, currentProduct, setCurrentProduct}}>
      <div className="ratingsAndReviews">
        <div className="ratingsAndReviews-title">
          Ratings and Reviews
        </div>
        <div className="ratings">
          <Ratings/>
        </div>
        <div className="reviews">
          <Reviews/>
        </div>
      </div>
    </MainContext.Provider>
  )
}

export default Rnr;