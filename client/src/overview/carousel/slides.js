import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Slide from './slide.js';

function Slides() {
  const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div className="slides">
      <Slide />
    </div>
  );
}

export default Slides;