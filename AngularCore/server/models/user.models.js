const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


 //declarando una variable para crear un USerSchema

 var userSchema = new mongoose.Schema({
    fullName:{
    type: String,
        require:'needs to have the full name.'
    },
    email:{
        type:String,
        require:'Email cant be empty.',
        unique: true
        
    },
    password: {
        type:String,
        require:'Password cant be Empty.',
        minlength: [8,'Minimun characters for the password is 8, please change or add charaters your password']


    },
    saltSecret:String // Utilizarlo para la emcripcion y descripcion 
 });

userSchema.path('email').validate((val)=>{
     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);

},'Invalid email');

 userSchema.pre('save', function (next){


    bcrypt.genSalt(10,(err,salt)=>{ // codido aleatorio encriptado
        bcrypt.hash(this.password,salt,(err, hash) => {
        this.password = hash;
         this.saltSecret = salt;
         next();// esta 4 propiedades sera salvado en la base de datos 
        });

    });

 });// esta funcion primero sera ejecutada para poder encriptar la informacion  del password en el hash// invocado


//despes del paso 30

userSchema.methods.verifyPassword = function(password){

    return bcrypt.compareSync(password,this.password);
};


userSchema.methods.generateJwt = function(){

    return jwt.sign({_id:this._id,exp},
    process.env.JWT_SECRET,{

        expiresIn: process.env,JWT_EXP
    });
     
}
 //este es utilizando dos parametos en la funcion , pero si tienes uno modificado puedes ponerlo un tercer paramertro

 mongoose.model('User',userSchema);// en ete caso sera salvado como como una Colecion de Users.. dependera de nombre 

