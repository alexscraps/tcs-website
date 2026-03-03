import { db } from "./server/db.js";
import { demoAccessTokens } from "./drizzle/schema.js";
import { desc } from "drizzle-orm";

const result = await db.select({
  token: demoAccessTokens.token,
  email: demoAccessTokens.email,
  firstName: demoAccessTokens.firstName,
  isUsed: demoAccessTokens.isUsed,
}).from(demoAccessTokens).orderBy(desc(demoAccessTokens.id)).limit(1);

console.log(JSON.stringify(result[0], null, 2));
process.exit(0);
