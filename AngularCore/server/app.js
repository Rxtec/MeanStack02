// conectanto los archivos de config y modles
require('./config/config')
require('./models/db')
require ('./config/passportConfig');

//configurando los "recall staments"

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');// despues del paso 30
const rtstIndex = require('./routes/index.router');

// para poder utilisar la funcion de express debemos crear una variable declarandola como lo siguinte

var app = express();


//midde where// configuando
app.use (bodyParser.json());
app.use(cors());// tenemos que habilitar el corts para que los distintos puertos se deban comunicar 

app.use(passport.initialize());
app.use ('/api',rtstIndex);

app.use((err,req,res, next)=>{

if (err.name === 'ValidationError'){
var valError =[];//variable para guardar los errorres
Object.keys(err.errors).forEach(key =>valError.push(err.errors[key].message));
res.status(422).send(valError)

}
else{console.log(err);}

});// para manejar validaciones globalmente

//'/api/register' // cuando el usuario se registra utilisara el interface para anadir

app.listen(process.env.PORT, () => console.log(`Server connected at  port :${process.env.PORT}`)); // inicio del servidor 

