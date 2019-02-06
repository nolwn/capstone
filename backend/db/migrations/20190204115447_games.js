
exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", table => {
    table.increments();
    table
      .string("host")
      .references("id")
      .inTable("users");
    table
      .integer("player_white")
      .references("id")
      .inTable("users");
    table
      .integer("player_black")
      .references("id")
      .inTable("users")
    table.string("previous_fen")
      .notNullable()
      .defaultTo("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
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
