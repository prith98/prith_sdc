import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function Thumbnail() {
  const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div>
      <img className="dot" onClick={currentSlide(1)} src="https://cdn.pixabay.com/photo/2019/07/06/11/49/woman-4320328_1280.jpg"/>
    </div>
  );
}

export default Thumbnail;