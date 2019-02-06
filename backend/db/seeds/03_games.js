exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("games").del()
    .then(function () {
      // Inserts seed entries
      return knex("games")
        .insert([
          {
            id: 1,
            player_white: 1,
            player_black: 2
          },
          {
            id: 2,
            player_white: 1,
            player_black: 3
          },
          {
            id: 3,
            player_white: 2,
            player_white: 3,
            started_at: new Date()
          }
        ])
        .then(() =>
          knex.raw(`SELECT setval("games_id_seq", (SELECT MAX(id) FROM games))`)
        );
    });
};
