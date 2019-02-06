exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(function () {
      // Inserts seed entries
      return knex("users")
        .insert([
          {
            id: 1,
            username: "Nolan",
            password: "password"
          },
          {
            id: 2,
            username: "William",
            password: "password"
          },
          {
            id: 3,
            username: "Edu",
            password: "password"
          },
          {
            id: 4,
            username: "BabyCakes",
            password: "password"
          }
      ])
      .then(() =>
        knex.raw(`SELECT setval("users_id_seq", (SELECT MAX(id) FROM users))`)
      );
    });
};
