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

// - [ ] GET for retrieving a `project` by its `id` that returns an object with the following structure:
router.get("/:id", async (req, res) => {
  try {
    const project = await db("projects")
      .where({ "projects.project_id": req.params.id })
      .first();

    const actions = await db("actions").where({ project_id: req.params.id });
    project.actions = actions;
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

// ```js
// {
//   id: 1,
//   name: 'project name here',
//   description: 'the project description',
//   completed: false, // or true, the database will return 1 for true and 0 for false
//   actions: [
//     {
//       id: 1,
//       description: 'action description',
//       notes: 'the action notes',
//       completed: false // or true
//     },
//     {
//       id: 7,
//       description: 'another action description',
//       notes: 'the action notes',
//       completed: false // or true
//     }
//   ]
// }
// ```;
