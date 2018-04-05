const express = require('express');
const router  = express.Router();



module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log("GET /");
    res.render('index');
  });

  router.get("/polls/:id", (req, res)=> {
    let id = req.params.id;
    console.log("/polls/:id: ", id);
    res.send("Succesful GET /:id with id: " + id);
  });

  router.get("/polls/:id/result", (req, res)=> {
    let id = req.params.id;
    console.log("/polls/:id/result: ", id);
    res.send("Succesful GET /polls/:id with id: " + id);
  });

  router.post("/polls/", (req, res) => {
    let poll = req.body.poll;
    console.log("POST / ", poll);
    res.send("Succesful POST /polls with " + poll);
  });

  router.put("/polls/:id", (req, res) => {
    let id = req.params.id;
    res.send("Succesful PUT /polls/:id with id: " + id);
  });
  return router;
};
