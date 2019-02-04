const path = require("path");

const development = {
  client: "postgresql",
  connection: "postgresql://localhost/chessmatch",
  migrations: {
    directory: path.join(__dirname, "db", "migrations")
  },
  seeds: {
    directory: path.join(__dirname, "db", "seeds")
  }
}

const production = {
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: path.join(__dirname, "db", "migrations")
  },
  seeds: {
    directory: path.join(__dirname, "db", "seeds")
  }
}

module.exports = { development, production };
