# SENG533
SENG 533 Performance Evaluation - TeaStore
# SENG533

SENG 533 Performance Evaluation - TeaStore

## Project Overview

This project evaluates the performance of TeaStore, a microservice-based web application, using Grafana k6 for load testing. The goal is to analyze how TeaStore behaves under different workload intensities and different CPU allocations.

### Performance Metrics Measured

* Average Response Time
* P95 Response Time
* Throughput (requests per second)
* Error Rate

TeaStore was deployed on a separate VM using Docker Compose, while load testing was performed from another machine using k6.

---

## System Under Test

### TeaStore Host VM

* Hosts TeaStore using Docker
* Ubuntu Server
* Separate VM from load generator

### Load Generator

* Local machine running Grafana k6
* Sends workload requests to TeaStore VM

This setup reduces resource contention and produces more reliable performance results.

---

## TeaStore Deployment

### Start TeaStore

docker-compose -f docker-compose_default.yaml up -d

### Stop TeaStore

docker-compose -f docker-compose_default.yaml down

### Verify Running Containers

docker ps

### TeaStore Access URL

text
http://10.1.1.166:8080/tools.descartes.teastore.webui/

---

## k6 Test Script

### test.js

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

This script simulates repeated homepage requests to TeaStore.

---

## Testing Commands

### Workload Intensity Tests

k6 run --vus 1 --duration 5m test.js > run_1vu_1.txt
k6 run --vus 10 --duration 5m test.js > run_10vu_1.txt
k6 run --vus 50 --duration 5m test.js > run_50vu_1.txt
k6 run --vus 100 --duration 5m test.js > run_100vu_1.txt
k6 run --vus 200 --duration 5m test.js > run_200vu_1.txt

Each workload level was repeated 3 times for confidence interval analysis.

---

### CPU Allocation Tests

docker update --cpus="0.5" $(docker ps -q)
k6 run --vus 100 --duration 5m test.js > cpu_0.5_100vu_1.txt

docker update --cpus="1.0" $(docker ps -q)
k6 run --vus 100 --duration 5m test.js > cpu_1_100vu_1.txt

docker update --cpus="2.0" $(docker ps -q)
k6 run --vus 100 --duration 5m test.js > cpu_2_100vu_1.txt

CPU allocation tests were performed for both 50 VU and 100 VU, with 3 repetitions per configuration.

---

## Downloading Result Files

After each test, result files were copied from the VM to the local project folder using SCP.

### Example Command

scp -i C:\Users\himel\cloud.key ubuntu@10.1.4.241:~/TeaStore/examples/docker/run_100vu_1.txt .

---

## Final Report Support

This repository contains:

* Source code
* Workload scripts
* Measurement data
* Experimental setup
* Commands used for execution

This supports the final report requirement for providing a public repository containing project artifacts and measurement results.