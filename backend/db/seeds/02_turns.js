
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("turns").del()
    .then(function () {
      // Inserts seed entries
      return knex("turns").insert();
    });
};
