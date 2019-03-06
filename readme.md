# Chess Match

Chess Match is a chess server that enables users to play with each other in real time. Users can create a game, or join a game that someone else has created, and start playing chess immediately.

Chess Match is built using separate client and API servers. The client communicates with the API using both RESTful API calls, and WebSockets through Socket.io.
The client provides a pleasing, user friendly interface that makes setting up a game, seeing game notifications and making moves easy and intuitive.

The API stores past games, verifies moves, and manages multiple active games across many users.

## API

### Installing the API for development

Before you start, make sure you have PostgreSQL and Redis installed and running on your system.

Instructions for installing PostgreSQL can be found [here](https://www.postgresql.org/download/).

Instructions for installing Redis can be found [here](https://redis.io/download).

1. Download or clone this repo.
2. Open the backend folder, `cd backend`.
3. Use `npm install` to install the dependencies.
4. Create the PostgreSQL database with `createdb chessmatch`.
5. Setup the database with `npm run knex migrate:latest`. More information about using Knex.js can be found [here](https://knexjs.org).
6. You can populate the database with whatever seeds you like by editing the `db/seeds.js` file in the backend or you can use the seeds that I have setup (all the users passwords are password). Run the seeds with `npm run knex seed:run`.
7. In the backend folder, create a file called `.env`. That file  should simply contain one line with `SECRET=` followed by a long secret string of characters of your choosing.
8. Start a development server with `npm run dev`.

### Using the API

The Chess Match API follows RESTful patterns. Logging in can be done through a post request to `/auth/login`. A users games can be found through `users/:user_id/games/` where `:user_id` is that users user id.

All the available routes are established in the JavaScript files in the routes folder.

## Client

### Installing the client

1. From the repo’s root directory, enter the frontend with `cd frontend`.
2. Install the dependencies with `npm install`. This may take awhile!
3. Start the client server with `npm start`.

### Using the client

![the login page](/img/login.png)

If you are a returning user, enter your username and password. If you are a new user, click "Create New User."

![the create user page](/img/create-user.png)

To create a new user, enter your desired username and password. Re-enter your password to make sure you know what you typed. Passwords must be at least 6 characters long.

![the dashboard](/img/dashboard.png)

The dashboard gives you information about the games you are currently playing on the left. On the right, you can choose the join a game or create a new game.

![the dashboard with labels](/img/dashboard-labeled.png)

**Your Active Games**

Your games in progress. The name is the name of your opponent. Below that is the game status. The blue pin indicates that it is your turn.

**Start a new game**

Click “Start as White” or ”Start as Black” to start a new game and add it to the lobby. If you are playing as white, you can make your first move before your opponent joins.

**Join a Game**

Click “Join as White” or ”Join as Black” to start a game that someone else has created. The left side of each game panel represents white, the right represents black. So, if a players name is on the right, they are playing white and you can join black and visa versa.

![the board](/img/board.png)

Click and drag your pieces to make a move. Blue dots indicate squares that are legal to move to. If you make an illegal move, your piece will snap back to its starting location.

![the board after a move](/img/move.png)

After the last move is indicated by blue squares.
