import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Slides from './slides.js';
import Thumbnails from './thumbnails.js';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
var slideIndex = 0;

function Arrows(props) {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures, thumbnailCount, setThumbnailCount, loadNextThumbnail, setLoadNextThumbnail, thumbnailIncrement, setThumbnailIncrement} = useContext(MainContext);
    var downActive = thumbnailCount > 5 ? true:false;
    var upActive = thumbnailIncrement > 0 ? true:false;

    let maxIndex = (thumbnailCount) - 5;

    if (thumbnailIncrement > maxIndex) {
      downActive = false;
    }

    if (thumbnailIncrement === maxIndex) {
      downActive = false;
    }


    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      //var dots = document.getElementsByClassName("dot");
      if (n >= mainPictures.length) {slideIndex = 0}
      if (n < 0) {slideIndex = mainPictures.length -1}
      // for (i = 0; i < dots.length; i++) {
      //     dots[i].className = dots[i].className.replace(" downActive", "");
      // }
      setMainPicture(mainPictures[slideIndex]);
      //dots[slideIndex-1].className += " downActive";
      console.log(slideIndex);
    }

    function renderThumbnails(direction) {
      if (direction === "up") {
        setThumbnailIncrement(thumbnailIncrement-1);
        console.log('SHWABANG', mainPictures[thumbnailIncrement - 1])
        setMainPicture(mainPictures[slideIndex - 1]);
      } else {
        setMainPicture(mainPictures[slideIndex + 1]);
        setThumbnailIncrement(thumbnailIncrement+1);
      }
    }

    if (mainPictures == null) {
      return <div>Loading</div>
    }

  return (
    <div>
      <a className="prev" onClick={() => {plusSlides(-1)}}><FiArrowLeft style={{height: '23px', width: '23px', color: 'black'}}/></a>
      <a className="next" onClick={() => {plusSlides(1)}}><FiArrowRight style={{height: '23px', width: '23px', color: 'black'}}/></a>
      <a className="down" onClick={() => {renderThumbnails('down')}}><RiArrowDownSLine style={{height: '20px', width: '20px', color: 'black', display: downActive === true ? '':'none'}}/></a>
      <a className="up"   onClick={() => {renderThumbnails('up')}}><RiArrowUpSLine style={{height: '20px', width: '20px', color: 'black', display: upActive === true ? '':'none'}}/></a>
    </div>
    )
  }

  export default Arrows;