// Creando una funcion para User registracion del Usuario o el Sign UP
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const _ = require('lodash');


module.exports.register =(req, res, next) => {
//console.log ('inside register example.');// para provar que aparesca el menje , que se aya subido el paquete
var user = new User();
user.fullName = req.body.fullName;
user.email = req.body.email;
user.password = req.body.password;
user.save((err,doc) => {    //salvando la informacion
if(!err){
    res.send(doc); }
        else{
            if (err.code == 11000){
                res.status(422).send(['Duplicated email adress']);
            }
            else{ return next(err);}
    }

});

}// will handle a resquest from from requerement 


// post route funtion for auntitification email and password
module.exports.authenticate = (req,res,next) => {

// llamando para el passport auntentification
passport.authenticate('local',(err,user,info)=>{

    if (err) 
    {return res.status(400).json(err);}
    else if(user) 
    {return res.status(200).json({"token":user.generateJwt()});}
    else   
     {return res.status(404).json(info);}

})(req,res);
}

module.exports.userProfile = (req,res,next)=>{
User.findOne({_id:req._id},
        (err,user)=>{
            if(!user)
                return res.status(404).json({status:false,message:"User record not founded"});
            else    
                return res.status(200).json({status:true, user : _.pick(user,['fullName','email']) });

        })//mongoose funtion



}