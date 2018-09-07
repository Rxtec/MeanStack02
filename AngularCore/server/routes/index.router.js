const express = require('express');
const router = express.Router();

const jwtHelper = require('../config/jwtHelper');
const controllerUser = require('../controller/user.controller');//navega dentro del directorio
//estos salen del User Controller
router.post('/register',controllerUser.register);
router.post('/authenticate',controllerUser.authenticate);

router.get('/userProfile',jwtHelper.verifyJwtToken,controllerUser.userProfile);//private key

module.exports = router; 