import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import { MainContext } from '../../../contexts/contexts.js';
import Review from './review.js';

function Reviews() {
  const { products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, additionalReviews, setAdditionalReviews, reviewsRendered, setReviewsRendered } = useContext(MainContext);

  let reviews;
  let reviewResults;

  let mapOverReviews = function () {
    reviews = reviewResults.map(() =>
      <Review />
    )
  }

  let showMoreReviews = function (event) {
    event.preventDefault();
    reviewResults = productReviews.results.slice(0, reviewsRendered + 2);
    mapOverReviews();
    let addTwoToReviewsRendered = reviewsRendered + 2;
    let subtractTwoFromAdditionalReviews = additionalReviews - 2;
    setAdditionalReviews(subtractTwoFromAdditionalReviews);
    setReviewsRendered(addTwoToReviewsRendered);
  }

  if (reviews == null) {
    reviewResults = productReviews.results.slice(0, 2);
    mapOverReviews();
  }

  return (
    <MainContext.Provider value={{ products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, additionalReviews, setAdditionalReviews, reviewsRendered, setReviewsRendered }}>
      <div>
        <div className="relevance">
          {productReviews.results.length} reviews, sorted by relevance
        </div>
        {reviews}
        <div>
          {additionalReviews > 0 ? <button className="show-more-reviews" onClick={(event) => {
            showMoreReviews(event);
          }}>Show more reviews</button> : ''}
        </div>
      </div>
    </MainContext.Provider>
  )
}

export default Reviews;