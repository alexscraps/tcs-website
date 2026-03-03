import Database from 'better-sqlite3';

const db = new Database('./data.db');
const result = db.prepare('SELECT token, email, firstName, isUsed FROM demo_access_tokens ORDER BY id DESC LIMIT 1').get();
console.log(JSON.stringify(result, null, 2));
db.close();
