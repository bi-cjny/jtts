var express = require('express');
var app = express();
var path = require('path');

//static server setup
var staticPath = path.join(__dirname, 'public');
app.use('/', express.static(staticPath));

app.listen(3000, function () {
    console.log('express server listening on :3000');
});