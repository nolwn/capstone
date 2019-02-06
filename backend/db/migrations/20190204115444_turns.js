
exports.up = function(knex, Promise) {
  return knex.schema.createTable("turns", table => {
    table.increments();
    table.integer("turn");
    table.string("pgn_white").notNullable();
    table.string("pgn_black");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("turns");
};
