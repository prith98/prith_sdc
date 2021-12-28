import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function Style(props) {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, features, setFeatures, styles, setStyles} = useContext(MainContext);
  return (
    <img className="style" src={props.url} />
  );
}

export default Style;