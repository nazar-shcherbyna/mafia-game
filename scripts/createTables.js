async function createUsersTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nickname VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        role user_role_enum DEFAULT 'player'
      );
    `;

    console.log(`Created "Users" table`);
  } catch (error) {
    console.error('Error creating table Users:', error);
    throw error;
  }
}

async function createEventsTable(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      await client.sql`
        CREATE TABLE IF NOT EXISTS events (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          admin_id UUID NOT NULL,
          title VARCHAR(255) NOT NULL,
          date TIMESTAMPTZ NOT NULL,
          location VARCHAR(255) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          status event_status_enum DEFAULT 'created',
          FOREIGN KEY (admin_id) REFERENCES users(id)
        );
    `;
  
      console.log(`Created "Events" table`);
  
    } catch (error) {
      console.error('Error creating table Events:', error);
      throw error;
    }
}
  
async function createEventsPlayersTable(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      await client.sql`
        CREATE TABLE IF NOT EXISTS events_players (
          event_id UUID,
          player_id UUID NOT NULL,
          status event_player_status_enum NOT NULL DEFAULT 'active',
          FOREIGN KEY (event_id) REFERENCES events(id),
          FOREIGN KEY (player_id) REFERENCES users(id)
        );
    `;
  
      console.log(`Created "EventsUsers" table`);
  
    } catch (error) {
      console.error('Error creating table EventsUsers:', error);
      throw error;
    }
}
  
async function createGamesTable(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      await client.sql`
        CREATE TABLE IF NOT EXISTS games (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          event_id UUID NOT NULL,
          started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          finished_at TIMESTAMPTZ,
          round INT NOT NULL DEFAULT 1,
          status game_status_enum NOT NULL DEFAULT 'started',
          turn game_turn_enum NOT NULL DEFAULT 'night',
          vinner game_vinner_enum,
          FOREIGN KEY (event_id) REFERENCES events(id)
        );
    `;
  
      console.log(`Created "Games" table`);
  
    } catch (error) {
      console.error('Error creating table Games:', error);
      throw error;
    }
}
  
async function createGamesPlayersTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS games_players (
        game_id UUID NOT NULL,
        player_id UUID NOT NULL,
        game_role game_player_role_enum,
        position_number INT,
        FOREIGN KEY (game_id) REFERENCES games(id),
        FOREIGN KEY (player_id) REFERENCES users(id)
      );
    `;

    console.log(`Created "GamesPlayers" table`);
  } catch (error) {
    console.error('Error creating table GamesPlayers:', error);
    throw error;
  }
}

async function createGamesRoundsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS games_rounds (
        game_id UUID NOT NULL,
        game_round INT NOT NULL,
        player_id UUID NOT NULL,
        player_status game_round_player_status_enum NOT NULL,
        FOREIGN KEY (game_id) REFERENCES games(id),
        FOREIGN KEY (player_id) REFERENCES users(id)
      );
  `;

    console.log(`Created "GamesRoundsState" table`);

  } catch (error) {
    console.error('Error creating table GamesRoundsState:', error);
    throw error;
  }
}

async function createTables(client) {
    try {
      // await createUsersTable(client);
      // await createEventsTable(client);
      // await createEventsPlayersTable(client);
      await createGamesTable(client);
      await createGamesPlayersTable(client);
      await createGamesRoundsTable(client);
    } catch (error) {
      console.error('Error creating tables:', error);
      throw error;
    }
}

module.exports = {
    createTables,
};