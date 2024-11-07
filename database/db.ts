import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DB_DATABASE_URL as string,
  /**
    database: process.env.NEXT_PUBLIC_DATABASE,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    port: Number(process.env.NEXT_PUBLIC_DB_PORT), 
    */
});
