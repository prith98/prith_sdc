import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import Reviews from './reviews.js';
import { MainContext } from '../../../contexts/contexts.js';

function Review(reviewData) {
  const { products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, reviewsRendered, setReviewsRendered } = useContext(MainContext);

  //   reviewData:
  // body: "Great outfit for huntin clams!"
  // date: "2021-11-09T00:00:00.000Z"
  // helpfulness: 5
  // photos: []
  // rating: 5
  // recommend: true
  // response: null
  // review_id: 1094634
  // reviewer_name: "Clamboni"
  // summary: "Clams"

  console.log(reviewData.reviewData.date);

  return (
    <div className="review">
      <div className="review-star-rating">
        Star Rating
      </div>
      <div className="review-user-header">
        Verified, {reviewData.reviewData.reviewer_name}, {reviewData.reviewData.date}
      </div>
      <div className="review-summary">
        {reviewData.reviewData.summary}
      </div>
      <div className="review-body">
        {reviewData.reviewData.body}
      </div>
      <div className="review-recommend">
        Recommend
      </div>
      <div className="review-response">
        Response
      </div>
      <div className="review-helpful">
        Helpful
      </div>
      <div className="review-report">
        Report
      </div>
    </div>
  )
}

export default Review;