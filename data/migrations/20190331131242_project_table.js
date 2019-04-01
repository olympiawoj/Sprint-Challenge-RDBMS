exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function(tbl) {
    tbl.increments("project_id");
    tbl
      .string("name", 128)
      .notNullable()
      .unique();
    tbl.string("description", 225).notNullable();
    tbl.boolean("is_complete").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};

// - [ ] A `project` can contain multiple actions and has:
//   - [ ] a unique Id.
//   - [ ] a name.
//   - [ ] a description.
//   - [ ] a flag that indicates if the project is complete or not.
