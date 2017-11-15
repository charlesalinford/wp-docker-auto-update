'use strict';

var fs = require('fs'),
colors = require('colors');

fs.writeFile(".env", "#Docker credentials\nDOMAIN=\nPHP_CONTAINER=", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(".env file created.".yellow);
});