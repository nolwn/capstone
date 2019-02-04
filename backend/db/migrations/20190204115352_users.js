
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("username")
      .notNullable()
      .unique();
    table
      .string("password")
      .notNullable();
    table.string("portrait_url");
    table.integer("wins");
    table.integer("loses");
    table.integer("draws");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
