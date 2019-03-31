const router = require("express").Router();

const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json(error));
});

router.post("/", (req, res) => {
  db("projects")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      //   console.log(id)
      db("projects")
        .where({ project_id: id })
        .then(project => {
          res.status(201).json(project);
        });
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
