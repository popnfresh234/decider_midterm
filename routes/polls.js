const express = require('express');
const router  = express.Router();



module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log("GET /");
    res.send("Succesful GET /");
  });

  router.get("/polls/:id", (req, res)=> {
    let id = req.params.id;
    console.log("/polls/:id: ", id);
    res.send("Succesful GET /:id with id: " + id);
    knex('poll')
      .innerJoin('option', 'poll.id', '=', 'option.poll_id')
      .where('poll.id', id)
      .then((results) => {
        console.log(results);
      });
  });

  router.get("/polls/:id/result", (req, res)=> {
    let id = req.params.id;
    console.log("/polls/:id/result: ", id);
    res.send("Succesful GET /polls/:id with id: " + id);
    knex('poll')
      .join('option', 'poll.id', '=', 'option.poll_id')
      .where('poll.id', id)
      .then((results) => {
        console.log(results);
      });
  });

  router.post("/polls/", (req, res) => {
    let poll = JSON.parse(req.body.poll);
    console.log("POST / ", poll);
    //Cet poll data form poll object
    let title = poll.title;
    let email = poll.email;
    let optionArray = poll.options;


    //Insert poll
    knex('poll')
      .returning('id')
      .insert({title: title, email: email})
      .then((id) =>  {
        console.log('Succesful inert, ID is: ' + id);

        //Handle inseting options here
        optionArray.forEach((option) => {
          let title = option.title;
          let description = option.description;
          console.log("FOR EACH");
          knex('option')
            .insert({title: title, description: description, poll_id: id[0]})
            .then((err) => {
              if (err) {
                console.log(err);
              }
          });
        });
      });

    res.send("Succesful POST /polls with " + poll);
  });

  router.put("/polls/:id", (req, res) => {
    let id = req.params.id;
    res.send("Succesful PUT /polls/:id with id: " + id);
  });
  return router;
};
