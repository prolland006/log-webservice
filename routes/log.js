"use strict";
var express = require('express');
var router = express.Router();

router.post('/add', function(req,res,next) {

    sakilaDbService.addFilm(req.body.title, (err, data) => {
        if(err) {
            //voir si erreur contrainte
            console.log(err);
            return next(err);
        } else {
            console.log('data',data);
        }
    });

    console.log(req.body);
});


module.exports = router;
