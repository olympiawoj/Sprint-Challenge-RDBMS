const router = require("express").Router();

const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

router.get("/", (req, res) => {
  db("actions")
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => res.status(500).json(error));
});

router.post("/", (req, res) => {
  db("actions")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db("actions")
        .where({ action_id: id })
        .first()
        .then(action => res.status(201).json(action));
    })
    .catch(err => res.status(500).json(error));
});

module.exports = router;
