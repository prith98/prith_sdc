//Use this headers object when doing an axios call to the API.
const express = require('express');
const Axios = require('axios');
const path = require('path');
// const {token} = require('../config_example.js');

const headers = {
  'User-Agent': 'request',
  'Authorization': `token ${token}`
}

var app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// var getRequest = function(url, callback) {
//     Axios.get(url, headers).then((response) => {callback(response)})
// };

// var postRequest = function(url, data) {
//   app.post(url, (req, res) => {
//     Axios.post(url, req.body, headers).then((response) => {res.send(response)})
//   })
// };

app.listen(3000, () => {console.log('Server listening on port 3000')});

// module.exports = { getRequest, postRequest };