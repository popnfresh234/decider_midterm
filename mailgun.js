var mailgun = require("mailgun-js");
var api_key = 'key-28320ad7026e77b9e0628183ddcf4db2';
var DOMAIN = 'sandboxb55326195b3b4f61aec5dbf4be9b98de.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
const emailData = require('./routes/polls.js');

var sendEmail = function(email) {

var data = {
  from: 'decidermidterm@gmail.com',
  to: email,
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = sendEmail;
