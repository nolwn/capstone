
exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", table => {
    table.increments();
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
    table
      .integer("game_id")
      .references("id")
      .inTable("games");
    table.string("content");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
