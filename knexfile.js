// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3", // tells knex that we're using the SQLite3 driver we installed via npm
    connection: {
      filename: "./data/project-db.sqlite3" // update this with the location of your database file, just make sure you have a data folder
    },
    useNullAsDefault: true, // configuration needed for sqlite (not needed for Postgres)
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    //by default sqlite will not enforce foreign keys
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done); //enforce FK
      }
    }
  }
};
