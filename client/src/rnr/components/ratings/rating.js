import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import { MainContext } from '../../../contexts/contexts.js';
import Ratings from './ratings.js';

function Rating(starData) {

  const {productRatings} = useContext(MainContext);

  console.log('starData', starData);



  return (
    <div>
      Hello
    </div>
  )
}

export default Rating;