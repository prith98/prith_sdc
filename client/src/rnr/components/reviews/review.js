import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import Reviews from './reviews.js';
import { MainContext } from '../../../contexts/contexts.js';

function Review() {
  const { products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, reviewsRendered, setReviewsRendered, reviewIndex, setReviewIndex } = useContext(MainContext);

  return (
    <div className="review">
      <div className="star-rating">
        Star Rating
      </div>
      <div className="verified">
        Verified
      </div>
      <div className="review-date">
        Review Date
      </div>
      <div className="review-title">
        Review Title
      </div>
      <div className="review-body">
        Review Body
      </div>
      <div className="recommend">
        Recommend
      </div>
      <div className="response">
        Response
      </div>
      <div className="helpful">
        Helpful
      </div>
      <div className="report">
        Report
      </div>
    </div>
  )
}

export default Review;