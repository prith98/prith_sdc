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
      return (<Review reviewData={reviewData} />);
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
    <MainContext.Provider value={{ products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, reviewsRendered, setReviewsRendered }}>
      <div>
      <div className="relevance" style={{marginBottom: "10px"}}>
            {productReviews.results.length} reviews, sorted by relevance
          </div>
        <div className="reviews-scroll-container" style={{ border: "1px solid black", borderRadius: "1px", width: "100%", height: "450px", overflowY: "scroll" }}>
          {reviews}
        </div>
        <div className="reviews-button-container" style={{float: "left", marginTop: "15px"}}>
          {reviewsRendered < productReviews.results.length ? <button className="show-more-reviews" style={{ display: "inline-block", marginRight: "20px" }} onClick={(event) => {
            showMoreReviews(event);
          }}>Show More Reviews</button> : ''}
          <button style={{ display: "inline-block" }}>Add a Review</button>
        </div>
      </div>
    </MainContext.Provider>
  )
}

export default Reviews;