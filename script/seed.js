const { db } = require('@vercel/postgres');
const {
  invoices,
  score,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

// 學生表
async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        student_id TEXT NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        image_url TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        person_id: TEXT NOT NULL,
        phone_1: TEXT NOT NULL,
        phone_2: TEXT NOT NULL,
        mobile: TEXT NOT NULL,
        emergency_phone: TEXT NOT NULL,
        emergency_contact: TEXT NOT NULL,
        residence_addr: TEXT NOT NULL,
        mailing_addr: TEXT NOT NULL,
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        return client.sql`
        INSERT INTO users (id, student_id, name, image_url,email,person_id,phone_1,phone_2,mobile,emergency_phone,emergency_contact,residence_addr,mailing_addr)
        VALUES (${user.id}, ${user.student_id}, ${user.name}, ${user.image_url},${user.email}, ${user.person_id}, ${user.phone_1}, ${user.phone_2},${user.mobile}, ${user.emergency_phone}, ${user.emergency_contact}, ${user.residence_addr},${user.mailing_addr})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
//成績表
async function seedScore(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id TEXT NOT NULL,
    school_year: INT NOT NULL,
    semester INT NOT NULL,
    chinese_score INT NOT NULL,
    math_score INT NOT NULL,
    english_score INT NOT NULL,
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedScore = await Promise.all(
      score.map(
        (score) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${score.id}, ${score.student_id},${score.school_year},${score.semester},${score.chinese_score},${score.math_score},${score.english_score})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedScore.length} score`);

    return {
      createTable,
      score: insertedScore,
    };
  } catch (error) {
    console.error('Error seeding score:', error);
    throw error;
  }
}



async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedScore(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
