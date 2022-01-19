/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// Use this headers object when doing an axios call to the API.
const express = require("express");
const Axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
const { TOKEN, URL } = require("../config.js");
const db = require("../database");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

const config = {
  headers: {
    Authorization: TOKEN,
    "Content-Type": "application/json",
  },
};

app.get("/qa/questions", db.getQuestions);
app.get("/qa/questions/:question_id/answers", db.getAnswers);
app.post("/qa/questions", db.postQuestion);
app.post("/qa/questions/:question_id/answers", db.postAnswer);
app.put("/qa/questions/:question_id/helpful", db.markQuestionHelpful);
app.put("/qa/questions/:question_id/report", db.reportQuestion);
app.put("/qa/answers/:answer_id/helpful", db.markAnswerHelpful);
app.put("/qa/answers/:answer_id/report", db.reportAnswer);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
