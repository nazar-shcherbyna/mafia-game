const { db } = require("@vercel/postgres");

async function dropTables(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS games_players;`;
    await client.sql`DROP TABLE IF EXISTS games_rounds;`;
    await client.sql`DROP TABLE IF EXISTS games;`;
    // await client.sql`DROP TABLE IF EXISTS events_players;`;
    // await client.sql`DROP TABLE IF EXISTS events;`;
    // await client.sql`DROP TABLE IF EXISTS users;`;
    console.log('Dropped tables');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
}

async function main() {
    const client = await db.connect();
  
    await dropTables(client);
  
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to drop the database:',
      err,
    );
  });
  