import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 100 }, // below normal load
    { duration: "10s", target: 500 },
    { duration: "10s", target: 700 }, // normal load
    { duration: "10s", target: 1000 },
  ],
};

export default function () {
  const randomProductId = (Math.random() * 1000000).toFixed(0);
  http.get(`http://localhost:3000/qa/questions?product_id=${randomProductId}`);
  sleep(1);
}
