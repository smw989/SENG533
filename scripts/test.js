import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 100,
  duration: "300s",
};

export default function () {
  http.get("http://10.1.1.166:8080/tools.descartes.teastore.webui/");
  sleep(1);
}