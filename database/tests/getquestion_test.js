import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 100,
  duration: "10s",
};

export default function () {
  const randomProductId = (Math.random() * 1000000).toFixed(0);
  http.get(`http://localhost:3000/qa/questions?product_id=${randomProductId}`);
  sleep(1);
}
