/* eslint-disable no-unused-vars */
const { Pool, Client } = require("pg");
const currentDate = Date.now();

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

  pool.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      response.send(err);
    }
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
      'helpfulness', a.helpfulness,
      'photos', ''
      )
    )
  ) FROM answers a WHERE a.id_questions = ${question_id} LIMIT ${count};`;

  pool.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      response.send(err);
    }
    if (results.rows[0]["json_agg"]) {
      responseObject.results = results.rows[0]["json_agg"];
      let promiseArray = [];
      responseObject.results.forEach(function (ans) {
        promiseArray.push(
          new Promise((resolve, reject) => {
            pool.query(
              `SELECT * FROM photos WHERE id_answers = ${ans.answer_id}`,
              (err, results2) => {
                if (err) {
                  console.log(err);
                  response.send(err);
                }
                ans.photos = results2.rows;
                resolve();
              }
            );
          })
        );
      });
      Promise.all(promiseArray).then(() => {
        response.json(responseObject.results);
      });
    } else {
      response.send("NO ANSWERS FOR THIS QUESTION");
    }
  });
};

const postQuestion = (req, res) => {
  const { body, name, email, product_id } = req.body;
  const helpfulness = 0;
  const reported = false;
  pool.query(
    `INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, asker_email, question_helpfulness, reported)
     VALUES ((SELECT MAX(question_id) + 1 FROM questions), $1, $2, $3, $4, $5, $6, $7)`,
    [product_id, body, currentDate, name, email, helpfulness, reported],
    (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log("Successfully added question to database");
      res.send("Successfully added question to database");
    }
  );
};

const postAnswer = (req, res) => {
  const { question_id } = req.params;
  const { body, name, email, photos } = req.body;
  const reported = false;
  const helpfulness = 0;
  pool.query(
    `INSERT INTO answers(answers_id, id_questions, body, date, answerer_name, answerer_email, reported, helpfulness)
     VALUES ((SELECT MAX(answers_id) + 1 FROM answers), $1, $2, $3, $4, $5, $6, $7)`,
    [question_id, body, currentDate, name, email, reported, helpfulness],
    (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log("Successfully added answer to database");
      res.send("Successfully added answer to database");
    }
  );
};

const markQuestionHelpful = (req, res) => {
  const { question_id } = req.params;
  pool.query(
    `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id}`,
    (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(`Successfully marked question ${question_id} as helpful`);
      res.send(`Successfully marked question ${question_id} as helpful`);
    }
  );
};

const reportQuestion = (req, res) => {
  const { question_id } = req.params;
  pool.query(
    `UPDATE questions SET reported = true WHERE question_id = ${question_id}`,
    (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(`Successfully reported question ${question_id}`);
      res.send(`Successfully reported question ${question_id}`);
    }
  );
};

const markAnswerHelpful = (req, res) => {
  const { answer_id } = req.params;
  pool.query(
    `UPDATE answers SET helpfulness = helpfulness + 1 WHERE answers_id = ${answer_id}`,
    (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(`Successfully marked answer ${answer_id} as helpful`);
      res.send(`Successfully marked answer ${answer_id} as helpful`);
    }
  );
};

const reportAnswer = (req, res) => {
  const { answer_id } = req.params;
  pool.query(
    `UPDATE answers SET reported = true WHERE answers_id = ${answer_id}`,
    (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(`Successfully reported answer ${answer_id}`);
      res.send(`Successfully reported answer ${answer_id}`);
    }
  );
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
  postQuestion,
  postAnswer,
  markQuestionHelpful,
  reportQuestion,
  markAnswerHelpful,
  reportAnswer,
};
