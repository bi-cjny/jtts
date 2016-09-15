var express = require('express');
var app = express();
var path = require('path');
var Stories = require("./Stories.js");
var _ = require("lodash");

//static server setup
var staticPath = path.join(__dirname, 'public');
app.use('/', express.static(staticPath));

function getStory(id){

}

//Story API
app.get('/stories', function(req, res){

});

app.get('/stories/:id', function(req, res){
    var story = Stories[req.params.id];
    res.json(story);
});

app.listen(3000, function () {
    console.log('express server listening on :3000');
});