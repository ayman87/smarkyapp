var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/nfcbookdb";

var client = new pg.Client(connectionString);
client.connect();


var queryinsert= client.query("INSERT INTO BOOKS VALUES(default,'9780495112402','7',clock_timestamp(),clock_timestamp(),'Serway','qwqw')");

var queryinsert1= client.query("INSERT INTO RFIDS VALUES(default,1,'7','19.5','9780495112402',clock_timestamp(),clock_timestamp(),'asas')");

var queryinsert2= client.query("INSERT INTO admin_answers VALUES(default,'9780495112402',1,'19.5','7',clock_timestamp(),clock_timestamp(),'Hello dido?','please','1','qwqw')");

var queryinsert3= client.query("INSERT INTO QUESTIONS VALUES(default,1,'9780495112402','19.5','7',clock_timestamp(),clock_timestamp(),'hello?',5,'Alan','2.5','qwqw')");

var queryinsert4= client.query("INSERT INTO ANSWERS VALUES(default,1,1,'9780495112402','19.5','7',clock_timestamp(),clock_timestamp(),'yea',5,'Alan','2.5','qwqw')");

var queryinsert5= client.query("INSERT INTO LINKS VALUES(default,1,'9780495112402','19.5','7',clock_timestamp(),clock_timestamp(),'www.google.com',5,'Alan','2.5','wqw')");

var queryinsert6= client.query("INSERT INTO SUMMARIES VALUES(default,1,'9780495112402','19.5','7',clock_timestamp(),clock_timestamp(),'Doing a good job',5,'Alan','2.5','wqw')");

var queryinsert7= client.query("INSERT INTO USERS VALUES(default,'Alan Harber','12345','Alan@gmail.com')");





queryinsert7.on('end', function() { client.end(); });