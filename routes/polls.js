const express = require('express');
const router  = express.Router();
const mailgun = require('../mailgun.js');
require('dotenv').config();


//Twilio config
const twilio = require('twilio');
const accountSid = 'AC7b9844743f81862b10662b3d94596ab5';
const authToken = '7489886f8680955b9485db6510d772b6';


module.exports = (knex) => {

  var client = new twilio(accountSid, authToken);


  router.get("/", (req, res) => {
    res.render('index');
  });

  router.get("/polls/:id", (req, res)=> {
    let id = req.params.id;
    knex('poll')
    .innerJoin('option', 'poll.id', '=', 'option.poll_id')
    .where('poll.id', id)
    .then((results) => {
      res.render('poll', {results});
    });
  });

  router.get("/polls/:id/links", (req, res) => {
    let id = req.params.id;
    res.render('links', {id});
  });

  router.get("/polls/:id/result", (req, res)=> {
    let id = req.params.id;
    knex('poll')
    .join('option', 'poll.id', '=', 'option.poll_id')
    .where('poll.id', id)
    .orderBy('rank', 'desc')
    .then((results) => {
      res.render('results', {results});
    });
  });

  router.post("/polls/", (req, res) => {
    let poll = req.body;
    //Cet poll data form poll object
    let title = poll.ptitle;
    let email = poll.email;
    let optionArray = poll.options;
    //Insert poll
    knex('poll')
    .returning('id')
    .insert({ptitle: title, email})
    .then((id) =>  {
        //Handle inseting options here
        let twilioMsg = title + " "; //Build twilio msg
        optionArray.forEach((option, index) => {
          let title = option.title;
          twilioMsg = twilioMsg + (index + 1) + " " + title + " ";
          let description = option.description;
          knex('option')
          .insert({title, description, poll_id: id[0]})
          .then((err) => {
            if (err) {
              console.log(err);
            }
          });
        });



        client.messages.create({
          body: twilioMsg,
          to: '+16048896508',
          from: process.env.TWILIO_NUMBER
        }).then((message)=>{
          console.log(message.sid);
        });
        res.send({redirect: '/polls/' + id +'/links'});
      });
  });

  router.put("/polls/:id", (req, res) => {
    let id = req.params.id;
    console.log(req.body);
    knex('poll')
    .select('email')
    .where('id', id)
    .then((result) => {
      let email = result[0].email;
      mailgun(email, id);
    });

    let optionsArray = req.body.data;
    optionsArray.forEach((option) => {
      knex('option')
      .increment('rank', option.rank)
      .where('id', option.option_id)
      .then((err) => {
        console.log(err);
      });
    });
    res.send({redirect: '/'});
  });
  return router;
};
