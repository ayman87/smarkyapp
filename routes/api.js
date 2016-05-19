var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || " postgres://gibhvqdyyuudcx:ZEloXSWrMEUpuUCa3e1QKb8IrC@ec2-23-21-42-29.compute-1.amazonaws.com:5432/dfr3e9sb0p3mu";

// var sequelize = new Sequelize('postgres://localhost:5432/nfcbookdb');


//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
//     // if user is authenticated in the session, call the next() to call the next request handler 
//     // Passport adds this method to request object. A middleware is allowed to add properties to
//     // request and response objects
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated then redirect him to the login pag
    return res.redirect('/');
};

// Register the authentication middleware
// router.use('/test', isAuthenticated);

//     });
// });
//Get data
// router.get('/', function(req, res, next) {
//   res.sendfile('./public/login.html');
// });
router.get('/test', function(req, res) {
	
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM USERS ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});
router.post('/testq/:name/:bookIsbn/:edition/:pagenumber', isAuthenticated, function(req, res) {

    var results = [];
    var isbn = req.params.bookIsbn;
    var pn = req.params.pagenumber;
    var edition = req.params.edition;
    var name = req.params.name
    //var idques = req.params.idques;



    // Grab data from http request
    var data = {question: req.body.question};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
            console.log(pn);
            console.log(isbn);
        // SQL Query > Update Data
        client.query("Insert into admin_answers (question,edition,isbn,pagenumber,updatedat,createdat) values ($1,$2,$3,$4,clock_timestamp(),clock_timestamp()) ;", [data.question,edition,isbn,pn]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM admin_answers  WHERE pagenumber=($1) ORDER BY id ASC ;",[pn]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});  


router.post('/testdqa/:name/:bookIsbn/:edition/:pagenumber/:idques',isAuthenticated, function(req, res) {

    var results = [];
    var isbn = req.params.bookIsbn;
    var pn = req.params.pagenumber;
    var edition = req.params.edition;
    var name = req.params.name
    var idques = req.params.idques;



    // Grab data from http request
    var data = {answers: req.body.answer};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
            console.log(pn);
            console.log(isbn);
        // SQL Query > Update Data
        client.query("Insert into answers (answer,edition,isbn,pagenumber,updatedat,createdat,userid,qid) values ($1,$2,$3,$4,clock_timestamp(),clock_timestamp(),$5,$6) ;", [data.answers,edition,isbn,pn,name,idques]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM answers WHERE pagenumber=($1) ORDER BY id ASC;",[pn]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});  


router.get('/testdqa/:bookIsbn/:edition/:pagenumber/:idques',isAuthenticated,function(req, res) {
    
    var results = [];
    var isbn = req.params.bookIsbn;
    var pn = req.params.pagenumber;
    var edition = req.params.edition;
    var idques = req.params.idques;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("SELECT * FROM questions WHERE isbn=($1) and pagenumber=($2) and id=($3) and edition=($4) ORDER BY id ASC;",[isbn,pn,idques,edition]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.get('/testda/:bookIsbn/:edition/:pagenumber/:idques',isAuthenticated,function(req, res) {
    
    var results = [];
    var isbn = req.params.bookIsbn;
    var pn = req.params.pagenumber;
    var edition = req.params.edition;
    var idques = req.params.idques;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
       var query = client.query("SELECT * FROM answers WHERE isbn=($1) and pagenumber=($2) and qid=($3) and edition=($4) ORDER BY id ASC;",[isbn,pn,idques,edition]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.get('/testq/:book_isbn/:pagenumber', isAuthenticated, function(req, res) {
    
    var results = [];
    var isbn = req.params.book_isbn;
    var pn = req.params.pagenumber;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM admin_answers WHERE isbn=($1) and pagenumber=($2) ORDER BY id ASC;",[isbn,pn]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.get('/testd/:book_isbn/:edition/:pagenumber', isAuthenticated, function(req, res) {
    
    var results = [];
    var isbn = req.params.book_isbn;
    var pn = req.params.pagenumber;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM questions WHERE isbn=($1) and pagenumber=($2) ORDER BY id ASC;",[isbn,pn]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.get('/testl/:book_isbn/:edition/:pagenumber',isAuthenticated, function(req, res) {
    
    var results = [];
    var isbn = req.params.book_isbn;
    var pn = req.params.pagenumber;
    var edition = req.params.edition;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM Links WHERE isbn=($1) and pagenumber=($2) ORDER BY id ASC;",[isbn,pn]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});


router.get('/tests/:bookIsbn/:edition/:pagenumber',isAuthenticated, function(req, res) {
    
    var results = [];
    var isbn = req.params.bookIsbn;
    var pn = req.params.pagenumber;
    var edition = req.params.edition;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM summaries WHERE isbn=($1) and pagenumber=($2) ORDER BY id ASC;",[isbn,pn]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.post('/testl/:name/:bookIsbn/:edition/:pagenumber',isAuthenticated, function(req, res) {

    var results = [];
    var isbn = req.params.bookIsbn;
    var pn = req.params.pagenumber;
    var edition = req.params.edition;
    var name = req.params.name



    // Grab data from http request
    var data = {link: req.body.answer};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
            console.log(pn);
            console.log(isbn);
        // SQL Query > Update Data
        client.query("Insert into links (link,edition,isbn,pagenumber,updatedat,createdat,userid) values ($1,$2,$3,$4,clock_timestamp(),clock_timestamp(),$5) ;", [data.link,edition,isbn,pn,name]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM Links WHERE pagenumber=($1) ORDER BY id ASC;",[pn]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});  


router.post('/tests/:name/:bookIsbn/:edition/:pagenumber', isAuthenticated,function(req, res) {

    var results = [];
    var isbn = req.params.bookIsbn;
    var pn = req.params.pagenumber;
    var edition = req.params.edition;
    var name = req.params.name



    // Grab data from http request
    var data = {summary: req.body.answer};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
            console.log(pn);
            console.log(isbn);
        // SQL Query > Update Data
        client.query("Insert into summaries (summary,edition,isbn,pagenumber,updatedat,createdat,userid) values ($1,$2,$3,$4,clock_timestamp(),clock_timestamp(),$5) ;", [data.summary,edition,isbn,pn,name]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM summaries WHERE pagenumber=($1) ORDER BY id ASC ;",[pn]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});  

router.get('/testb', isAuthenticated ,function(req, res) {
    
    var results = [];
    //var isbn = req.params.bookIsbn;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM books ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});



router.get('/testp/:bookIsbn/:edition', isAuthenticated,function(req, res) {
    
    var results = [];
    var isbn = req.params.bookIsbn;
    var edition = req.params.edition;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM RFIDS WHERE isbn=($1) and edition=($2) ORDER BY id ASC;",[isbn,edition]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});


router.post('/testp/:bookIsbn/:edition', isAuthenticated, function(req, res) {

    var results = [];
    var isbn = req.params.bookIsbn;
    var edition = req.params.edition;
    //var idques = req.params.idques;



    // Grab data from http request
    var data = {pagenumber: req.body.pagenumber};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
        // SQL Query > Update Data
        client.query("Insert into rfids (pagenumber,edition,isbn,updatedat,createdat) values ($1,$2,$3,clock_timestamp(),clock_timestamp()) ;", [data.pagenumber,edition,isbn]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM rfids WHERE isbn=($1) and edition=($2) ORDER BY id ASC;",[isbn,edition]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});  


router.get('/testqa/:bookIsbn/:pagenumber/:idques', isAuthenticated,function(req, res) {
    
    var results = [];
    var isbn = req.params.bookIsbn;
    var pn = req.params.pagenumber;
    var idques = req.params.idques;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT *  FROM admin_answers WHERE isbn=($1) and pagenumber=($2) and id=($3);",[isbn,pn,idques]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});


// // Update data
router.put('/test/:user_id', isAuthenticated,function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.user_id;

    // Grab data from http request
    var data = {name: req.body.name,email:req.body.email ,password:req.body.password};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE USERS SET name=($1), email=($2) , password=($3) WHERE id=($4)", [data.name,data.email,data.password,id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM USERS ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});


router.put('/testqa/:bookIsbn/:pagenumber/:idques',isAuthenticated, function(req, res) {

    var results = [];
    var isbn = req.params.bookIsbn;
    var pn = req.params.pagenumber;
    var idques = req.params.idques;

    // Grab data from http request
    var data = {answer: req.body.answer};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE admin_answers SET answer=($1) WHERE isbn=($2) and pagenumber=($3) and id=($4)", [data.answer,isbn,pn,idques]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM admin_answers WHERE pagenumber=($1) and id=($2) ORDER BY id ASC;",[pn,idques]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});  

// // Delete data
router.delete('/test/:user_id',isAuthenticated, function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.user_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM USERS WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM USERS ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

module.exports = router;
