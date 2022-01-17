import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1000,
  duration: "10s",
};

export default function () {
  const randomQuestionID = (Math.random() * 300000).toFixed(0);
  http.get(
    `http://localhost:3000/qa/questions/` + randomQuestionID + "/answers"
  );
  sleep(1);
};
