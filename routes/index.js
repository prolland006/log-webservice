"use strict";
var express = require('express');
var log = require('../services/log');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let _log = new log();
    console.log('read');
    _log.readMongo()
        .then(docs=>{
            res.render('index', {
              title: 'geoloc tracker',
              docs: docs
            });
        })
        .catch(err=>{
            res.render('index', {
                title: 'error',
                docs: err
            });
        });
});

module.exports = router;
