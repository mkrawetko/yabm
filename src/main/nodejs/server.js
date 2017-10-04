'use strict';
let express = require('express');
let app = express();
let morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./App/yabmui/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/builds', function(req, res) {

    // use teamcity to get all builds

});