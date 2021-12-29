import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../contexts/contexts.js';
import Axios from 'axios';
import Reviews from './components/reviews/reviews.js';
import Ratings from './components/ratings/ratings.js';
import Review from './components/reviews/review.js';

function Rnr() {
  const { products, setProducts, currentProductId, setCurrentProductId } = useContext(MainContext);

  const [productReviews, setProductReviews] = useState(null);
  const [additionalReviews, setAdditionalReviews] = useState(null);
  const [reviewsRendered, setReviewsRendered] = useState(2);

  useEffect(() => {
    Axios.get(`/reviews?product_id=${currentProductId}`).then((response) => {
      setProductReviews(response.data);
      setAdditionalReviews(response.data.results.length - 2);
    });
  }, currentProductId);

  if (productReviews == null || additionalReviews == null) {
    return (<div>Loading...</div>);
  } else {
    return (
      <MainContext.Provider value={{ products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, additionalReviews, setAdditionalReviews, reviewsRendered, setReviewsRendered }}>
        <div className="ratingsAndReviews">
          <div className="ratingsAndReviews-title">
            Ratings and Reviews
          </div>
          <div className="ratings">
            <Ratings />
          </div>
          <div className="reviews">
            <Reviews />
          </div>
        </div>
      </MainContext.Provider>
    )
  }


}

export default Rnr;