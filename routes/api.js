var express = require('express');

var cors = require('cors');

var app = express();


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');

    next(); // make sure we go to the next routes and don't stop here
});


router.route('/send-email').post(function(req, res) {

    var sendgrid = require('sendgrid').mail;

    from_email = new sendgrid.Email(req.body.from_email);
    to_email = new sendgrid.Email(req.body.to_email);
    subject = req.body.subject;
    content = new sendgrid.Content("text/plain", req.body.content);
    mail = new sendgrid.Mail(from_email, subject, to_email, content);

    // add cc and bcc email
    mail.personalizations[0].addCc(new sendgrid.Email(req.body.cc_email));
    mail.personalizations[0].addBcc(new sendgrid.Email(req.body.bcc_email));


    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);

    })

});



// create an email (accessed at POST http://localhost:8080/api/sendemail)



module.exports = router;
