/* eslint-disable no-unused-vars */
const {Pool, Client} = require('pg');
const fs = require('fs');
const fastcsv = require('fast-csv');

const stream = fs.createReadStream('database/test.csv');

const csvData = [];
const csvStream = fastcsv
    .parse()
    .on('data', function(data) {
      csvData.push(data);
    })
    .on('end', function() {
    // remove the first line: header
      csvData.shift();

      // connect to the PostgreSQL database
      const pool = new Pool({
        user: 'prithjaganathan',
        host: 'localhost',
        database: 'qadb',
        password: 'password',
        port: 5432,
      });

      const query = 'INSERT INTO product (product_id) VALUES($1)';

      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach((row) => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log('inserted ' + res.rowCount + ' row:', row);
              }
            });
          });
        } finally {
          done();
        }
      });
    // save csvData
    });
stream.pipe(csvStream);

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

