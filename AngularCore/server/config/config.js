// variable para poder verificar el enviroment
var env = process.env.NODE_ENV || 'development';

// para poder estraer la informacion del json file
var config = require('./config.json');


var envConfig = config[env];
                        // asing values to the key
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key] );

//
