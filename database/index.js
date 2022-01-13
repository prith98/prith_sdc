/* eslint-disable no-unused-vars */
const {Pool, Client} = require('pg');

// eslint-disable-next-line max-len
// const stream = fs.createReadStream('/home/prithjaganathan/Downloads/product.csv');

const pool = new Pool({
  user: 'prithjaganathan',
  host: 'localhost',
  database: 'qadb',
  password: 'password',
  port: 5432,
});

const client = new Client({
  user: 'prithjaganathan',
  host: 'localhost',
  database: 'qadb',
  password: 'password',
  port: 5432,
});

const getQuestions = (request, response) => {
  const { product_id } = request.query;
  pool.query('SELECT (question_id, question_body) FROM questions WHERE product_id = ($1)', [product_id], (err, results) => {
    if (err) {
      console.log(err);
      response.send(err);
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  });
};

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`connected to database`);
  }
});

module.exports = {
  getQuestions,
};

