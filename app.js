const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const dbConn = require('./database.js');

dbConn(() => console.log('Mongo Connected...'));

app.use(express.static('public'))

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: false }))

app.listen(3000, () => console.log('Express running on port 3000'));

app.use('/', require('./router.js'));