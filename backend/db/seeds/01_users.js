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
            password: "$2a$10$KZZ.HbZrcL7enekBtX1l7uJ6mJM8c7J5OyfY.Xta5zcIGDCfb4SSC"
          },
          {
            id: 2,
            username: "William",
            password: "$2a$10$KZZ.HbZrcL7enekBtX1l7uJ6mJM8c7J5OyfY.Xta5zcIGDCfb4SSC"
          },
          {
            id: 3,
            username: "Edu",
            password: "$2a$10$KZZ.HbZrcL7enekBtX1l7uJ6mJM8c7J5OyfY.Xta5zcIGDCfb4SSC"
          },
          {
            id: 4,
            username: "BabyCakes",
            password: "$2a$10$KZZ.HbZrcL7enekBtX1l7uJ6mJM8c7J5OyfY.Xta5zcIGDCfb4SSC"
          }
      ])
      .then(() =>
        knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
      );
    });
};
