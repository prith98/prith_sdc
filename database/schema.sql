
DROP DATABASE IF EXISTS qadb;
CREATE DATABASE qadb;
\c qadb;

CREATE TABLE product (
 product_id BIGSERIAL PRIMARY KEY
 );

CREATE TABLE questions (
 id BIGSERIAL PRIMARY KEY,
 question_id INT,
 question_body VARCHAR(1000),
 question_date TIMESTAMP,
 asker_name VARCHAR(50),
 question_helpfulness INT,
 reported BOOLEAN,
 id_product INT,
 FOREIGN KEY (id_product) REFERENCES product(product_id)
);

CREATE TABLE answers (
 id BIGSERIAL PRIMARY KEY,
 answer_id INT,
 body VARCHAR(1000),
 date TIMESTAMP,
 helpfulness INT,
 id_questions INT,
 FOREIGN KEY (id_questions) REFERENCES questions(id)
);

CREATE TABLE photos (
 id BIGSERIAL PRIMARY KEY,
 url VARCHAR(300),
 id_answers INT,
 FOREIGN KEY (id_answers) REFERENCES answers(id)
);
