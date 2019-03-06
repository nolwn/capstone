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
            player_black: 2,
            started_at: new Date()
          },
          {
            id: 2,
            player_white: 1,
            player_black: 3,
            started_at: new Date()
          },
          {
            id: 3,
            player_white: 2,
            player_black: 3,
            started_at: new Date()
          },
          {
            id: 4,
            player_white: 2,
            player_black: null
          },
          {
            id: 5,
            player_white: null,
            player_black: 1
          },
          // {
          //   id: 6,
          //   player_white: 4,
          //   player_black: null
          // },
          {
            id: 7,
            player_white: 2,
            player_black: null
          },
          {
            id: 8,
            player_white: null,
            player_black: 2
          }
        ])
        .then(() =>
          knex.raw(`SELECT setval('games_id_seq', (SELECT MAX(id) FROM games))`)
        );
    });
};
