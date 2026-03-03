import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.ts';
import { like } from 'drizzle-orm';

const DATABASE_URL = process.env.DATABASE_URL;

async function getQoolizeData() {
  let connection;
  try {
    connection = await mysql.createConnection(DATABASE_URL);
    const db = drizzle(connection, { schema, mode: 'default' });
    
    const qoolizeRegs = await db.select().from(schema.webinarRegistrations).where(like(schema.webinarRegistrations.webinarName, '%Qoolize%'));
    
    console.log('\n=== QOOLIZE WEBINAR REGISTRATION ===\n');
    
    if (qoolizeRegs.length === 0) {
      console.log('No Qoolize registrations found.');
    } else {
      qoolizeRegs.forEach((reg, index) => {
        console.log(`Registration #${index + 1}:`);
        console.log(`  Webinar Name: ${reg.webinarName}`);
        console.log(`  First Name: ${reg.firstName}`);
        console.log(`  Last Name: ${reg.lastName}`);
        console.log(`  Email: ${reg.email}`);
        console.log(`  Company: ${reg.company || 'N/A'}`);
        console.log(`  Role: ${reg.role || 'N/A'}`);
        console.log(`  Registered: ${reg.createdAt.toLocaleString()}`);
        console.log('');
      });
    }
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

getQoolizeData();
