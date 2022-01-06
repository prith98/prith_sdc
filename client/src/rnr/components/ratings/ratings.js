import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import { MainContext } from '../../../contexts/contexts.js';
import Rating from './rating.js';

function Ratings() {
  const { products, setProducts, currentProduct, setCurrentProduct, productReviews, setProductReviews, productRatings, setProductRatings } = useContext(MainContext);

  console.log('productRatings', productRatings);

  // Object
  // config: {url: '/reviews/meta?product_id=44388', method: 'get', headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
  // data:
  // characteristics:
  // Comfort: {id: 148892, value: '2.5000000000000000'}
  // Fit: {id: 148890, value: '2.2826086956521739'}
  // Length: {id: 148891, value: '2.4565217391304348'}
  // Quality: {id: 148893, value: '2.8163265306122449'}
  // [[Prototype]]: Object
  // product_id: "44388"
  // ratings:
  // 1: "8"
  // 2: "20"
  // 3: "15"
  // 4: "17"
  // 5: "29"
  // [[Prototype]]: Object
  // recommended:
  // false: "8"
  // true: "81"
  // [[Prototype]]: Object
  // [[Prototype]]: Object
  // headers: {content-length: '345', content-type: 'application/json; charset=utf-8', date: 'Tue, 04 Jan 2022 02:47:19 GMT', etag: 'W/"159-sHgBP00Iljbj1vVdMhOfsOX0XQU"', x-powered-by: 'Express'}
  // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
  // status: 200
  // statusText: "OK"
  // [[Prototype]]: Object

  let starRatingsArray = [];

  // for (var star in productRatings.data.ratings) {
  //   starRatingsArray.push(star);
  // }

  for (var i = 5; i > 0; i--) {
    starRatingsArray.push(productRatings.data.ratings[i.toString()]);
  }

  //Create overall product rating decimal number
  let oneStarRatings = Number(productRatings.data.ratings[1]);
  let twoStarRatings = Number(productRatings.data.ratings[2]);
  let threeStarRatings = Number(productRatings.data.ratings[3]);
  let fourStarRatings = Number(productRatings.data.ratings[4]);
  let fiveStarRatings = Number(productRatings.data.ratings[5]);

  let totalRatingsCount = oneStarRatings + twoStarRatings + threeStarRatings + fourStarRatings + fiveStarRatings;

  let oneStarRatingsWeighted = oneStarRatings;
  let twoStarRatingsWeighted = twoStarRatings * 2;
  let threeStarRatingsWeighted = twoStarRatings * 3;
  let fourStarRatingsWeighted = twoStarRatings * 4;
  let fiveStarRatingsWeighted = twoStarRatings * 5;

  let totalRatingsWeighted = oneStarRatingsWeighted + twoStarRatingsWeighted + threeStarRatingsWeighted + fourStarRatingsWeighted + fiveStarRatingsWeighted;

  let overallProductRating = totalRatingsWeighted / totalRatingsCount;
  overallProductRating = Math.round(overallProductRating * 10) / 10;

  //Create the recommended percentage
  let recommendedTrue = Number(productRatings.data.recommended.true);
  let recommendedFalse = Number(productRatings.data.recommended.false);
  let recommendedPercentage = (recommendedTrue / (recommendedTrue + recommendedFalse)) * 100;
  let recommendedPercentageAsAString = recommendedPercentage.toString();

  //REALLY create the recommended percentage
  if (Number(recommendedPercentageAsAString[4]) >= 5) {
    if (recommendedPercentageAsAString[3] === '9') {
      if (recommendedPercentageAsAString[1] === '9') {
        if (recommendedPercentageAsAString[0] === '9') {
          recommendedPercentageAsAString = '100%';
        } else {
          recommendedPercentageAsAString = (Number(recommendedPercentageAsAString[0]) + 1).toString() + '0%';
        }
      } else {
        recommendedPercentageAsAString = recommendedPercentageAsAString[0] + (Number(recommendedPercentageAsAString[1]) + 1).toString() + '%';
      }
    } else {
      recommendedPercentageAsAString = recommendedPercentageAsAString.slice(0, 3) + (Number(recommendedPercentageAsAString[3]) + 1).toString() + '%';
    }
  } else {
    recommendedPercentageAsAString = recommendedPercentageAsAString.slice(0, 4) + '%';
  }

  if (recommendedPercentageAsAString[3] === '0') {
    recommendedPercentageAsAString = recommendedPercentageAsAString.slice(0, 2) + '%';
  }

  return (
    <MainContext.Provider value={{productRatings}}>
    <div className="ratings-container">
      <div className="ratings-number-and-stars">
        <div className="ratings-decimal">
          {overallProductRating}
        </div>
        <div className="ratings-overall-star">
          star rating
        </div>
      </div>
      <div className="ratings-recommend-percentage">
        {recommendedPercentageAsAString} of reviewers recommend this product
      </div>
      <div>
        {starRatingsArray.map((starData) => {
          return <Rating starData={starData}/>
        })}
      </div>
      <div className="ratings-5-star">
        <span className="ratings-5-star-text">
          5 stars
        </span>
        <span className="ratings-5-star-bar">
          bar
        </span>
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
    </MainContext.Provider>
  )
}

export default Ratings;