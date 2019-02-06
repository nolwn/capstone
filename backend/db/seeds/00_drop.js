exports.seed = function(knex, Promise) {
  return knex("turns").del()
    .then(() => knex("games").del())
    .then(() => knex("users").del());
}
