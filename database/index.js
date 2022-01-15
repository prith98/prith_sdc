/* eslint-disable no-unused-vars */
const { Pool, Client } = require("pg");

// eslint-disable-next-line max-len

const pool = new Pool({
  user: "prithjaganathan",
  host: "localhost",
  database: "qadb",
  password: "password",
  port: 5432,
});

const getQuestions = (request, response) => {
  let { product_id, page, count } = request.query;
  page = page || 1;
  count = count || 5;

  let resultsObject = {
    product_id: product_id,
    results: "",
  };

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
  ) FROM questions q WHERE q.product_id = ${product_id} LIMIT ${count};`;

  // const queryString = `SELECT (json_agg(
  //     json_build_object(
  //     'question_id', q.question_id,
  //     'question_body', q.question_body,
  //     'question_date', q.question_date,
  //     'asker_name', q.asker_name,
  //     'question_helpfulness', q.question_helpfulness,
  //     'reported', q.reported,
  //     'answers', json_build_object(
  //         'id', a.answers_id,
  //         'body', a.body,
  //         'date', a.date,
  //         'answerer_name', a.answerer_name,
  //         'helpfulness', a.helpfulness
  //     )
  //   )
  // )
  // ) FROM questions q INNER JOIN answers a on a.id_questions = q.question_id GROUP BY q.question_id LIMIT ${count};`

  pool.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      response.send(err);
    }
    // resultsObject.results = results.rows[0]["json_agg"];
    console.log(results.rows[0]["json_agg"]);
    response.status(200).send(results.rows[0]["json_agg"]);
  });
};

const getAnswers = (request, response) => {
  const { question_id } = request.params;
  let { page, count } = request.query;
  page = page || 1;
  count = count || 5;

  let responseObject = {
    question: question_id,
    page: page,
    count: count,
    results: "",
  };

  const queryString = `SELECT (json_agg(
    json_build_object(
      'answer_id', a.answers_id,
      'body', a.body,
      'date', a.date,
      'answerer_name', a.answerer_name,
      'helpfulness', a.helpfulness
      )
    )
  ) FROM answers a WHERE a.id_questions = ${question_id} LIMIT ${count};`;

  pool.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      response.send(err);
    }
    console.log(results.rows);
    responseObject.results = results.rows[0]["json_agg"];
    response.status(200).json(responseObject);
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
