# Ascent Squad API - Products Microservice

## Background

This repo contains my *System Design Capstone* project for the [Hack Reactor](https://www.hackreactor.com/) software engineering immersive program.

This assignment consisted of taking the functionality of an existing monolithic API for a mock e-commerce web app and dissecting it into a microservice architecture with the goal of improving the performance with higher traffic, with each microservice being built by a different developer.

The microservice contained in this repo is the ```/questions``` and ```/answers``` endpoints, which return data about a product's user-submitted questions and answers,
including information such as how many times a question/answer was reported and marked helpful and who asked the QA and when

This microservice was built from scratch in 1.5 weeks.

---

## Deployment & Performance

To test this microservice's performance with a large dataset, the PostgreSQL database was a seeded with roughly 7 million records.

This microservice was then deployed with the following configuration: 

- 3 API Servers 
    - Docker images built from this repo
    - AWS EC2 t2 micro instances
- 1 Database Server
    - AWS EC2 t2 micro instances
- 1 Nginx Load Balancer
    - AWS EC2 XXL instance

This configuration was stress tested with LoaderIO, resulting with the following stats from one of the tests:

- 90,000 requests/minute
- 79ms avg request duration
- 0% error rate
---

## Primary Technologies

This app was built using the following primary technologies:

### API Server
- **ExpressJS**
    - NodeJS framework used to develop the API server.
- **PostgreSQL**
    - SQL RDMS used for data persistence - accessed via the **pg** driver package.

### Deployment ###
- **Amazon EC2**
    - Cloud computing service used to launch multiple API server instances
- **Nginx**
    - HTTP server used to load balance mutiple API server instances

### Testing
- **Jest**
    - Testing framework, primarily used for testing data model methods and API calls.
- **SuperTest**
    - Testing library used to make API server calls within Jest.
- **k6**
    - Testing library used to stress test the app locally
- **LoaderIO**
    - Developer tool used to stress test the deployed app

---
