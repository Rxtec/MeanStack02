const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');// variable para llamar a la base de dato

passport.use(
    new localStrategy({usernameField:'email'},
    (username,password,done) =>{
        //validando la log in
            User.findOne({emal:username},
           (err,user)=>{
               if (err){
                return done(err);}
                //Usuario desconocido
                else if (!user){
                    return done(null,false,{message:'Email not registered'});}
                    // El password es incorecto
                else if (!user.verifyPassword(password)){
                    return done(null,false,{message:'Incorrect Password'}) ;}
                    // suscessfull
                   else  { return done(null,user);}            
     });

    })
);