var pg = require('pg');
var connectionString = process.env.DATABASE_URL ;

var client = new pg.Client(connectionString);
client.connect();


var queryinsert= client.query("INSERT INTO BOOKS VALUES(default,1111,7,clock_timestamp(),'Serawy')");

var queryinsert1= client.query("INSERT INTO RFIDS VALUES(default,1,7,1,1111,clock_timestamp(),clock_timestamp())");

var queryinsert2= client.query("INSERT INTO admin_answers VALUES(default,1111,1,1,7,clock_timestamp(),clock_timestamp(),'Hello dido?','please')");

var queryinsert3= client.query("INSERT INTO QUESTIONS VALUES(default,1,1111,1,7,clock_timestamp(),clock_timestamp(),'hello?',5,'Alan','2.5')");

var queryinsert4= client.query("INSERT INTO ANSWERS VALUES(default,1,1,1111,1,7,clock_timestamp(),clock_timestamp(),'yea',5,'Alan','2.5')");

var queryinsert5= client.query("INSERT INTO LINKS VALUES(default,1,1111,1,7,clock_timestamp(),clock_timestamp(),'www.google.com',5,'Alan','2.5')");

var queryinsert6= client.query("INSERT INTO SUMMARIES VALUES(default,1,1111,1,7,clock_timestamp(),clock_timestamp(),'Doing a good job',5,'Alan','2.5')");

var queryinsert7= client.query("INSERT INTO USERS VALUES(default,'Alan Harber','12345','Alan@gmail.com')");





queryinsert7.on('end', function() { client.end(); });