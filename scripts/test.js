import http from "k6/http";
import { sleep } from "k6";

// Change vus to 1, 10, 50, or 100 for each run
export let options = {
  vus: 1,
  duration: "5m",
};

export default function () {
  http.get("http://10.1.4.241:8080/tools.descartes.teastore.webui/");
  sleep(1);
}