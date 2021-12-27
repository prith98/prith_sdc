import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';
import Carousel from './carousel/carousel.js'
import RightPanel from './rightpanel/rightpanel.js';
import ProductOverview from './productoverview/productoverview.js'

function Overview() {
  const {products, setProducts, cart, setCart} = useContext(MainContext);
  const [features, setFeatures] = useState(null);
  const [styles, setStyles] = useState(null);

  let featuresData = [];
  let stylesData = [];
  let count = -1;

  useEffect(() => {
    products.forEach((product) => {
      featuresData.push(Axios.get('/products/' + product.id).then((result) => { return result.data; }));
      stylesData.push(Axios.get('/products/' + product.id + '/styles').then((result) => { return result.data; }));
    });
    count = -1;
    Promise.all(featuresData).then((values) => {
      setFeatures(values);
    });
    Promise.all(stylesData).then((values) => {
      setStyles(values);
    });

  }, []);

    // var slideIndex = 1;
    // showSlides(slideIndex);

    // function plusSlides(n) {
    //   showSlides(slideIndex += n);
    // }

    // function currentSlide(n) {
    //   showSlides(slideIndex = n);
    // }

    // function showSlides(n) {
    //   var i;
    //   var slides = document.getElementsByClassName("mySlides");
    //   var dots = document.getElementsByClassName("dot");
    //   if (n > slides.length) {slideIndex = 1}
    //   if (n < 1) {slideIndex = slides.length}
    //   for (i = 0; i < slides.length; i++) {
    //       slides[i].style.display = "none";
    //   }
    //   for (i = 0; i < dots.length; i++) {
    //       dots[i].className = dots[i].className.replace(" active", "");
    //   }
    //   slides[slideIndex-1].style.display = "block";
    //   dots[slideIndex-1].className += " active";
    // }

  return (
    <MainContext.Provider value={{products, setProducts, cart, setCart, features, setFeatures, styles, setStyles}}>

      <div className="overview-columns">
        <Carousel />
        <RightPanel />
      </div>
      <ProductOverview />

    </MainContext.Provider>
  );
}

export default Overview;