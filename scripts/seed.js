const { db } = require('@vercel/postgres');
const {
  testUsers,
} = require('../app/lib/placeholder-data.js');
const {
  createEnums
} = require('./createEnums.js');
const {
  createTables
} = require('./createTables.js');
const bcrypt = require('bcrypt');
const {
  defautlUsers,
} = require('../app/lib/placeholder-data.js');

async function seedTestUsers(client) {
  try {
    // Insert default data into the "users" table
    const insertedDefaultUser = await Promise.all(
      defautlUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (nickname, password, role)
          VALUES (${user.nickname}, ${hashedPassword}, 'admin')
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );
  
    console.log(`Seeded ${insertedDefaultUser.length} default Users`);

    const insertedTestUsers = await Promise.all(
      testUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (nickname, password)
          VALUES (${user.nickname}, ${hashedPassword});
        `;
      }),
    );

    console.log(`Seeded ${insertedTestUsers.length} test users`);

  } catch (error) {
    console.error('Error seeding test users:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createEnums(client);
  await createTables(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
