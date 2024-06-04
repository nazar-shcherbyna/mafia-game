const { db } = require('@vercel/postgres');
const {
  defautlUsers,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

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
}

async function createUsersTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await createUserRoleEnum(client);

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

    // Insert default data into the "users" table
    const insertedUsers = await Promise.all(
      defautlUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (nickname, password, role)
          VALUES (${user.nickname}, ${hashedPassword}, 'admin')
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} Users`);

  } catch (error) {
    console.error('Error creating table Users:', error);
    throw error;
  }
}

async function createEventsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await createEventStatusEnum(client);

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

async function createEventsUsersTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS events_users (
        event_id UUID,
        user_id UUID NOT NULL,
        FOREIGN KEY (event_id) REFERENCES events(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
  `;

    console.log(`Created "EventsUsers" table`);

  } catch (error) {
    console.error('Error creating table EventsUsers:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createUsersTable(client);
  await createEventsTable(client);
  await createEventsUsersTable(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
