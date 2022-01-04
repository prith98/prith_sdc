import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../contexts/contexts.js';
import Axios from 'axios';
import Reviews from './components/reviews/reviews.js';
import Ratings from './components/ratings/ratings.js';
import Review from './components/reviews/review.js';

function Rnr() {
  const { products, setProducts, currentProductId, setCurrentProductId } = useContext(MainContext);

  //useEffect from app. Need to create two get requests so promise all is needed. Good luck, Brett.

//   useEffect(() => {
//     getRequests.push(Axios.get('/products').then((result) => { return result.data; }));
//     getRequests.push(Axios.get('/cart').then((result) => { return result.data; }));

//   Promise.all(getRequests).then((values) => {
//     setProducts(values[0]);
//     setCart(values[1]);
//     let productKey = values[0][0]['id'];
//     setCurrentProductId(productKey);
//   });
// }, []);

  const [productReviews, setProductReviews] = useState(null);
  const [reviewsRendered, setReviewsRendered] = useState(2);
  const [productRatings, setProductRatings] = useState(null);

  useEffect(() => {
    Axios.get(`/reviews?product_id=${currentProductId}`).then((response) => {
      setProductReviews(response.data);
    });
    Axios.get(`/reviews/meta?product_id=${currentProductId}`).then((response) => {
      setProductRatings(response);
    })
  }, currentProductId);

  if (productReviews == null || productRatings == null) {
    return (<div>Loading...</div>);
  } else {
    return (
      <MainContext.Provider value={{ products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, reviewsRendered, setReviewsRendered, productRatings, setProductRatings }}>
        <div id="rnr" className="ratingsAndReviews">
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