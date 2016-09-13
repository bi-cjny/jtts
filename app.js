var express = require('express');
var app = express();
var path = require('path');

//static server setup
var staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});