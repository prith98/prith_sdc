import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function Style(props) {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, features, setFeatures, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture} = useContext(MainContext);

  function setCurrentStyle() {
    setCurrStyle(props.style_id);
    setMainPicture(props.main)
  }

  return (
    <img className="style" src={props.url} onClick={setCurrentStyle} />
  );
}

export default Style;