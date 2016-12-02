"use strict";
var express = require('express');
var router = express.Router();
var log = require('../services/log');

router.post('/add', function(req,res,next) {

    console.log('body',req.body);
    let logfile = new log();
    console.log('write body');
    logfile.write(req.body);
    res.sendStatus(201);
});


module.exports = router;
