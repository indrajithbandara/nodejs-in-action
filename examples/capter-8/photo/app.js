var express = require('express');
var app = express();
var photos = require('./routes/photos')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('photos', __dirname + '/public/photos');

app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('photos')));
