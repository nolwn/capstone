
exports.up = function(knex, Promise) {
  return knex.schema.createTable("turns", table => {
    table.increments();
    table.string("pgn_white");
    table.string("pgn_black");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("turns");
};
