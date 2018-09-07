const mongoose = require('mongoose');


//evento conect the data base

mongoose.connect(process.env.MONGODB_URI,(err)=>{

// statement to verify the connection to the data base

    if (!err){console.log('Connection to database Suceded');}
                                                                    // bring the erroe message with proper Identation
        else  {  console.log('Connection to database Was not Suscefull'+JSON.stringify(err,undefined,2));}

// in order to use this we need to added this file to the app.js
});

require('./user.models');