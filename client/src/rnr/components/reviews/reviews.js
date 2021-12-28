import React, { useState, useContext, useEffect} from 'react';
import Rnr from '../../rnr.js';
import {MainContext} from '../../../contexts/contexts.js';

function Reviews() {
  const {products, setProducts, currentProduct, setCurrentProduct} = useContext(MainContext);

  return (
    <div>
      Reviews
    </div>
  )
}

export default Reviews;