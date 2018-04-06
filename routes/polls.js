const express = require('express');
const router  = express.Router();
const mailgun = require('../mailgun.js');


module.exports = (knex) => {

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
    console.log("/polls/:id/result: ", id);
    knex('poll')
    .join('option', 'poll.id', '=', 'option.poll_id')
    .where('poll.id', id)
    .orderBy('rank', 'desc')
    .then((results) => {
      res.render('results', {results});
    });
  });

  router.post("/polls/", (req, res) => {
    console.log(req.body);
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
      console.log('Succesful insert, ID is: ' + id);

        //Handle inseting options here
        optionArray.forEach((option) => {
          let title = option.title;
          let description = option.description;
          console.log("FOR EACH");
          knex('option')
          .insert({title, description, poll_id: id[0]})
          .then((err) => {
            if (err) {
              console.log(err);
            }
          });
        });
        res.send({redirect: '/polls/' + id +'/links'});
      });
   });


  router.put("/polls/:id", (req, res) => {
    let id = req.params.id;

    knex('poll')
    .select('email')
    .where('id', id)
    .then((result) => {
      let email = result[0].email;
      mailgun(email);
    });

    let optionsArray = JSON.parse(req.body.options);
    optionsArray.forEach((option) => {
      console.log('OPTION ID: ', option.option_id);
      console.log('WEIGHT: ', option.weight);
      knex('option')
      .increment('rank', option.weight)
      .where('id', option.option_id)
      .then((err) => {
        console.log(err);
      });
    });
    res.send("Succesful PUT /polls/:id with id: " + id);
  });
  return router;
};
