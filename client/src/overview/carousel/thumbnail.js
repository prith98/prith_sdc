import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function Thumbnail(props) {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture} = useContext(MainContext);

  function replaceMainPicture() {
    setMainPicture(props.photo['url']);
  }

  return (
    <div>
      <img className="dot" src={props.url} onClick={replaceMainPicture}/>
    </div>
  );
}

export default Thumbnail;