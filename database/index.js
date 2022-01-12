const {Pool, Client} = require('pg');

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

const getProducts = (request, response) => {
  pool.query('SELECT * FROM product', (err, results) => {
    if (err) {
      console.log(err);
      response.send(err);
    }
    response.status(200).json(results.rows);
  });
};

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`connected to database`);
  }
});

module.exports = {
  getProducts,
};

