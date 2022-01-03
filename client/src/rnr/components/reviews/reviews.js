import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import { MainContext } from '../../../contexts/contexts.js';
import Review from './review.js';

function Reviews() {
  const { products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, reviewsRendered, setReviewsRendered } = useContext(MainContext);

  const [reviews, setReviews] = useState(null);

  let reviewResults;

  let mapOverReviews = function () {
    setReviews(reviewResults.map((reviewData) => {
      return (<Review reviewData={reviewData}/>);
    }))
  }



  let showMoreReviews = function (event) {
    event.preventDefault();
    reviewResults = productReviews.results.slice(0, reviewsRendered + 2);
    mapOverReviews();
    setReviewsRendered(reviewsRendered + 2);
  }

  if (reviews == null) {
    reviewResults = productReviews.results.slice(0, 2);
    mapOverReviews();
  }

  return (
    <MainContext.Provider value={{ products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, reviewsRendered, setReviewsRendered}}>
      <div>
        <div className="relevance">
          {productReviews.results.length} reviews, sorted by relevance
        </div>
        {reviews}
        <div>
          {reviewsRendered < productReviews.results.length ? <button className="show-more-reviews" onClick={(event) => {
            showMoreReviews(event);
          }}>Show more reviews</button> : ''}
        </div>
      </div>
    </MainContext.Provider>
  )
}

export default Reviews;