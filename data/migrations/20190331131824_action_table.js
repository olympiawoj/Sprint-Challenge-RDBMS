exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", function(tbl) {
    //primary key- unique id
    tbl.increments("action_id");
    //description
    tbl.string("description", 225).notNullable();
    //notes
    tbl.string("notes", 225).notNullable();
    tbl.boolean("is_complete").notNullable();
    //foreign key
    tbl
      .integer("project_id")
      .unsigned()
      .references("project_id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};

// - [ ] An `action` belongs to only one project. An action has:
//   - [ ] a unique id.
//   - [ ] a description of what needs to be done.
//   - [ ] a notes column to add additional information.
//   - [ ] a flag that indicates if the action has been completed.

// Feel free to name the tables and fields anything you want. **Add relationships** as you see fit.
