import React from 'react';
import requests from '../../server/index.js';
import Path from 'path';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: []
    }
  };

  componentDidMount() {
    let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-den/';
    requests.getRequest(Path.join(url, 'products'), (res) => {console.log(res)});
  }

  render() {
    return (<div>Hello Test</div>)
  }
}