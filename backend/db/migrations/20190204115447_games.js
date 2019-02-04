
exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", table => {
    table.increments();
    table
      .integer("player_white")
      .references("id")
      .inTable("users")
      .unique();
    table
      .integer("player_black")
      .references("id")
      .inTable("users")
      .unique();
    table.string("winner");
    table.integer("time");
    table.timestamp("started_at");
    table.timestamp("ended_at");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("games");
};
