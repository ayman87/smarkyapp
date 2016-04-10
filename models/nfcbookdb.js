var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/nfcbookdb';

var client = new pg.Client(connectionString);
client.connect();



var querytz = client.query('Alter DATABASE nfcbookdb SET TIME ZONE "Africa/Cairo"');

var query = client.query('CREATE TABLE BOOKS(id SERIAL unique ,ISBN INT , EDITION INT , UpdatedAt timestamp , NAME VARCHAR(100),PRIMARY KEY(ISBN,EDITION) )');

var query1 = client.query('CREATE TABLE RFIDS(id SERIAL,bid INT ,EDITION INT ,PageNumber INT, ISBN INT,updatedAt timestamp , createdAt timestamp ,PRIMARY KEY(id,ISBN,EDITION) ,FOREIGN KEY (bid) REFERENCES BOOKS (id), unique(PageNumber,bid))');

var query2 = client.query('CREATE TABLE admin_answers(id SERIAL,ISBN INT,bid INT , PageNumber INT , EDITION INT, updatedAt timestamp, createdAt timestamp,QUESTION text, ANSWER text , PRIMARY KEY(id,ISBN,EDITION,PageNumber), FOREIGN KEY(ISBN,EDITION) REFERENCES BOOKS(ISBN,EDITION),FOREIGN KEY(PageNumber,bid) REFERENCES RFIDS(PageNumber,bid))');

var query3 = client.query('CREATE TABLE QUESTIONS(id SERIAL unique,bid INT,ISBN INT , PageNumber INT , EDITION INT, updatedAt timestamp,createdAt timestamp, QUESTION text,RatingCount INT, USERID VARCHAR(40) ,RATING VARCHAR(20),  PRIMARY KEY(id,ISBN,EDITION,PageNumber), FOREIGN KEY(ISBN,EDITION) REFERENCES BOOKS(ISBN,EDITION) ,FOREIGN KEY(PageNumber,bid) REFERENCES RFIDS(PageNumber,bid))');


var query4 = client.query('CREATE TABLE ANSWERS(id SERIAL, bid INT,qid INT ,ISBN INT , PageNumber INT , EDITION INT, updatedAt timestamp,createdAt timestamp,ANSWER text,RatingCount INT, USERID VARCHAR(40) ,RATING VARCHAR(20), PRIMARY KEY(id,ISBN,EDITION,PageNumber), FOREIGN KEY(ISBN,EDITION) REFERENCES BOOKS(ISBN,EDITION),FOREIGN KEY(qid) REFERENCES QUESTIONS(id), FOREIGN KEY(PageNumber,bid) REFERENCES RFIDS(PageNumber,bid) )');


var query5 = client.query('CREATE TABLE LINKS(id SERIAL,bid INT,ISBN INT , PageNumber INT , EDITION INT, updatedAt timestamp, createdAt timestamp,LINK text,RatingCount INT, USERID VARCHAR(40) ,RATING VARCHAR(20), PRIMARY KEY(id,ISBN,EDITION,PageNumber), FOREIGN KEY(ISBN,EDITION) REFERENCES BOOKS(ISBN,EDITION),FOREIGN KEY(PageNumber,bid) REFERENCES RFIDS(PageNumber,bid))');



var query6 = client.query('CREATE TABLE SUMMARIES(id SERIAL,bid INT,ISBN INT , PageNumber INT , EDITION INT, updatedAt timestamp, createdAt timestamp,SUMMARY text,RatingCount INT, USERID VARCHAR(40) ,RATING VARCHAR(20), PRIMARY KEY(id,ISBN,EDITION,PageNumber), FOREIGN KEY(ISBN,EDITION) REFERENCES BOOKS(ISBN,EDITION),FOREIGN KEY(PageNumber,bid) REFERENCES RFIDS(PageNumber,bid))');



var query7 = client.query('CREATE TABLE USERS(id SERIAL PRIMARY KEY, name text not null, password text not null,email text not null unique )');




query7.on('end', function() { client.end(); });