/* eslint-disable no-unused-vars */
const {Pool, Client} = require('pg');

// eslint-disable-next-line max-len

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
  let { product_id, page, count } = request.query;
  page = page || 1;
  count = count || 5;

  const queryString = `SELECT (json_agg(
    json_build_object(
      'question_id', q.question_id,
      'question_body', q.question_body,
      'question_date', q.question_date,
      'asker_name', q.asker_name,
      'question_helpfulness', q.question_helpfulness,
      'reported', q.reported
    )
  )
  ) FROM questions q WHERE product_id = ${product_id} LIMIT ${count}`;

  pool.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      response.send(err);
    }
    console.log(results.rows);
    response.status(200).send(results.rows);
  });
};

const getAnswers = (request, response) => {
  const { question_id } = request.params;
  let { page, count } = request.query;
  page = page || 1;
  count = count || 5;
  pool.query('SELECT (answers_id, body, date, answerer_name, helpfulness) FROM answers WHERE id_questions = ($1) LIMIT ($2)',
  [question_id, count], (err, results) => {
    if (err) {
      console.log(err);
      response.send(err);
    }
    console.log(results.rows);
    response.status(200).send(results.rows);
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
  getAnswers,
};

