import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Thumbnail from './thumbnail.js'

function Thumbnails() {
  const {products, setProducts, cart, setCart} = useContext(MainContext);

  return (
    <div className="dot-container">
      <Thumbnail />
    </div>
  );
}

export default Thumbnails;