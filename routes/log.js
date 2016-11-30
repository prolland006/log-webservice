"use strict";
var express = require('express');
var router = express.Router();

router.post('/add', function(req,res,next) {

    console.log(req.body);
});


module.exports = router;
