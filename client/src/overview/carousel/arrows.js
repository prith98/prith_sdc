import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Slides from './slides.js';
import Thumbnails from './thumbnails.js';
var slideIndex = 0;
function Arrows(props) {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures} = useContext(MainContext);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      //var dots = document.getElementsByClassName("dot");
      if (n === mainPictures.length) {slideIndex = 0}
      if (n < 0) {slideIndex = mainPictures.length -1}
      // for (i = 0; i < dots.length; i++) {
      //     dots[i].className = dots[i].className.replace(" active", "");
      // }
      setMainPicture(mainPictures[slideIndex]);
      //dots[slideIndex-1].className += " active";
      console.log(slideIndex);
    }

    if (mainPictures == null) {
      return <div>Loading</div>
    }

  return (
    <div>
      <a className="prev" onClick={() => {plusSlides(-1)}}>&#10094;</a>
      <a className="next" onClick={() => {plusSlides(1)}}>&#10095;</a>
    </div>
    )
  }

  export default Arrows;