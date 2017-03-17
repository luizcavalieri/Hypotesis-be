var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();


router.get('/', function(req, res) {
    res.json({ message: 'Api working!' });
});






module.exports = router;
