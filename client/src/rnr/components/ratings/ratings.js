import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import { MainContext } from '../../../contexts/contexts.js';

function Reviews() {
  const { products, setProducts, currentProduct, setCurrentProduct, productReviews, setProductReviews } = useContext(MainContext);

  return (
    <div className="ratings">
      <div className="ratings-number-and-stars">
        <div className="ratings-decimal">
          3.5
        </div>
        <div className="ratings-overall-star">
          star rating
        </div>
      </div>
      <div className="ratings-recommend-percentage">
        100% of reviewers recommend this product.
      </div>
      <div className="ratings-5-star">
        <div className="ratings-5-star-text">
          5 stars
        </div>
        <div className="ratings-5-star-bar">
          bar
        </div>
      </div>
      <div className="ratings-4-star">
        <div className="ratings-4-star-text">
          4 stars
        </div>
        <div className="ratings-4-star-bar">
          bar
        </div>
      </div>
      <div className="ratings-3-star">
        <div className="ratings-3-star-text">
          3 stars
        </div>
        <div className="ratings-3-star-bar">
          bar
        </div>
      </div>
      <div className="ratings-2-star">
        <div className="ratings-2-star-text">
          2 stars
        </div>
        <div className="ratings-2-star-bar">
          bar
        </div>
      </div>
      <div className="ratings-1-star">
        <div className="ratings-1-star-text">
          1 stars
        </div>
        <div className="ratings-1-star-bar">
          bar
        </div>
      </div>
      <div className="ratings-size-slider">
        size-slider
      </div>
      <div className="ratings-comfort-slider">
        comfort-slider
      </div>
    </div>
  )
}

export default Reviews;