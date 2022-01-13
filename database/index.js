/* eslint-disable no-unused-vars */
const {Pool, Client} = require('pg');
const fs = require('fs');
const fastcsv = require('fast-csv');

// eslint-disable-next-line max-len
// const stream = fs.createReadStream('/home/prithjaganathan/Downloads/product.csv');
const stream = fs.createReadStream('/home/prithjaganathan/Downloads/product.csv');

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

      // const query = 'INSERT INTO questions (question_id, question_body, question_date, asker_name, question_helpfulness, reported, id_product) VALUES($1, $2, $3, $4, $5, $6, $7)';
      const query = 'INSERT INTO product (product_id) VALUES($1)';

      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach((row) => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err);
                done();
              }
            });
          });
        } finally {
          console.log('DONE');
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

// const getProduct = (request, response) => {
//   const {id} = request.body;
//   pool.query('SELECT * FROM product WHERE product_id = (?)', [id] (err, results) => {
//     if (err) {
//       console.log(err);
//       response.send(err);
//     }
//     response.status(200).json(results.rows);
//   });
// };

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`connected to database`);
  }
});

// module.exports = {
//   getProduct,
// };

