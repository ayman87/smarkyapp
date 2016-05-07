var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var pg = require('pg');
var User = require('./models/users');
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.id);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user.id);
            done(err, user);
        });
    });

   passport.use('login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { 
            // check in db if a user with username exists or not
            User.findOne(email,function(err, isNotavailable, user) {
                    
                    // console.log(user.rows[0].name);
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (user.rows == null){
                        console.log('error', 'No user found.');
                        return done(err, false); // console.log is the way to set flashdata using connect-flash         
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user.rows[0],password))
                    {
                        console.log('error', 'Oops! Wrong password.');
                        return done(err, false); // create the loginMessage and save it to session as flashdata
                    }
                    console.log("heeeeh");
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user.rows[0]);
                }
            );
        }
    ));

   passport.use('signup', new LocalStrategy({
            nameField:'name',
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            process.nextTick(function(callback) {
            // find a user in postgresql with provided username
            User.findOne(email, function(err, isNotAvailable, user) {
                // In case of any error, return using the done method
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                 if (isNotAvailable == true) {
                        console.log('signupMessage', 'That email is already taken.');
                        return done(null, false);
                    } else {
                        console.log('new local user');

                        // if there is no user with that email
                        // create the user
                        user = new User();


                        // set the user's local credentials
                        user.name = req.body.name;
                        user.email    = req.body.email;
                        user.password = createHash(req.body.password);
                        

                        user.save(function(newUser) {
                            newUser.password = (password);
                            console.log("the object user is: ", newUser);
                            passport.authenticate();
                            return done(null, newUser);                        
                        });
                }
            });
        })
      }
    ));
    
    
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
