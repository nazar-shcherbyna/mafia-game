const { db } = require('@vercel/postgres');
const {
  testUsers,
  testEvent,
  defautlAdmins,
} = require('../app/lib/placeholder-data.js');
const {
  createEnums
} = require('./createEnums.js');
const {
  createTables
} = require('./createTables.js');
const bcrypt = require('bcrypt');

async function seedTestUsers(client) {
  try {
    // Insert default data into the "users" table
    const insertedDefaultUser = await Promise.all(
      defautlAdmins.map(async (admin) => {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        return client.sql`
          INSERT INTO users (id, nickname, password, role)
          VALUES (${admin.id}, ${admin.nickname}, ${hashedPassword}, 'admin')
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );
  
    console.log(`Seeded ${insertedDefaultUser.length} default Users`);

    const insertedTestUsers = await Promise.all(
      testUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, nickname, password)
          VALUES (${user.id}, ${user.nickname}, ${hashedPassword});
        `;
      }),
    );

    console.log(`Seeded ${insertedTestUsers.length} test Users`);

  } catch (error) {
    console.error('Error seeding test users:', error);
    throw error;
  }
}

async function seedEvents(client) {
  try {
    // Insert test event into the "events" table
    await client.sql`
      INSERT INTO events (id, title, date, location, admin_id)
      VALUES (${testEvent.id}, ${testEvent.title}, ${testEvent.date}, ${testEvent.location}, ${testEvent.admin_id});
    `;

    console.log(`Seeded test Event`);

  } catch (error) {
    console.error('Error seeding test event:', error);
    throw error;
  }
}

async function seedEventsPlayers(client) {
  try {
    const seededEventsPlayers = await Promise.all(
      testUsers.map(async (user) => {
        return client.sql`
          INSERT INTO events_players (event_id, player_id)
          VALUES (${testEvent.id}, ${user.id});
        `;
      })
    )

    console.log(`Seeded ${seededEventsPlayers.length} test EventsPlayers`);

  } catch (error) {
    console.error('Error seeding test events players:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await createEnums(client);
  // await createTables(client);

  // await seedTestUsers(client);
  // await seedEvents(client);
  // await seedEventsPlayers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
