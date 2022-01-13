
DROP DATABASE IF EXISTS qadb;
CREATE DATABASE qadb;
\c qadb;


CREATE TABLE questions (
 question_id BIGSERIAL PRIMARY KEY,
 product_id INT,
 question_body VARCHAR(1000),
 question_date BIGINT,
 asker_name VARCHAR(50),
 asker_email VARCHAR(50),
 question_helpfulness INT,
 reported BOOLEAN
);

CREATE TABLE answers (
 answers_id BIGSERIAL PRIMARY KEY,
 id_questions INT,
 body VARCHAR(1000),
 date BIGINT,
 answerer_name VARCHAR(50),
 answerer_email VARCHAR(100),
 reported BOOLEAN,
 helpfulness INT,
 FOREIGN KEY (id_questions) REFERENCES questions(question_id)
);

CREATE TABLE photos (
 photos_id BIGSERIAL PRIMARY KEY,
 id_answers INT,
 url VARCHAR(500),
 FOREIGN KEY (id_answers) REFERENCES answers(answers_id)
);


COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
FROM '/home/prithjaganathan/Downloads/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(answers_id, id_questions, body, date, answerer_name, answerer_email, reported, helpfulness)
FROM '/home/prithjaganathan/Downloads/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(photos_id, id_answers, url)
FROM '/home/prithjaganathan/Downloads/answers_photos.csv'
DELIMITER ','
CSV HEADER;


