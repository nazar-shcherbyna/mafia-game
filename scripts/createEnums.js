async function createUserRoleEnum(client) {
    await client.sql`
    DO $$
      BEGIN
        IF 
          NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') 
        THEN 
        CREATE TYPE user_role_enum AS ENUM ('player', 'admin');
        END IF;
      END $$;
    `;

    console.log('Created "user_role_enum" type');
}
  
async function createEventStatusEnum(client) {
    await client.sql`
    DO $$
      BEGIN
        IF 
          NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_status_enum') 
        THEN 
          CREATE TYPE event_status_enum AS ENUM ('created', 'in-progress', 'completed');
        END IF;
      END $$;
    `;

    console.log('Created "event_status_enum" type');
}
  
async function createGameStatusEnum(client) {
    await client.sql`
    DO $$
      BEGIN
        IF 
          NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'game_status_enum') 
        THEN 
          CREATE TYPE game_status_enum AS ENUM ('started', 'finished');
        END IF;
      END $$;
    `;

    console.log('Created "game_status_enum" type');
}
  
async function createGameTurnEnum(client) {
    await client.sql`
      DO $$
        BEGIN
          IF 
            NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'game_turn_enum') 
          THEN 
            CREATE TYPE game_turn_enum AS ENUM ('day', 'night');
          END IF;
        END $$;
    `;

    console.log('Created "game_turn_enum" type');
}
  
async function createEventPlayerStatusEnum(client) {
    await client.sql`
    DO $$
      BEGIN
        IF 
          NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_player_status_enum') 
        THEN 
          CREATE TYPE event_player_status_enum AS ENUM ('active', 'inactive', 'banned');
        END IF;
      END $$;
    `;

    console.log('Created "event_player_status_enum" type');
}

async function createGamePlayerRoleEnum(client) {
    await client.sql`
    DO $$
      BEGIN
        IF 
          NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'game_player_role_enum') 
        THEN 
          CREATE TYPE game_player_role_enum AS ENUM (
            'civilian',
            'detective',
            'doctor',
            'killer',
            'hooker',
            'mafia',
            'don'
          );
        END IF;
      END $$;
    `;

    console.log('Created "game_player_role_enum" type');
}

async function createGamePlayerStatusEnum(client) {
    await client.sql`
    DO $$
      BEGIN
        IF 
          NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'game_player_status_enum') 
        THEN 
          CREATE TYPE game_player_status_enum AS ENUM (
            'alive',
            'checked_by_detective',
            'killed_by_detective',
            'hooked',
            'killed_by_day_vote',
            'killed_by_killer',
            'killed_by_mafia',
            'hilled_by_doctor'
          );
        END IF;
      END $$;
    `;

    console.log('Created "game_player_status_enum" type');
}

async function createEnums(client) {
    await createUserRoleEnum(client);
    await createEventStatusEnum(client);
    await createGameStatusEnum(client);
    await createGameTurnEnum(client);
    await createEventPlayerStatusEnum(client);
    await createGamePlayerRoleEnum(client);
    await createGamePlayerStatusEnum(client);
}

module.exports = {
    createEnums
}