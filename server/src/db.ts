import "dotenv/config"
import { Pool } from "pg";

const pg = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: Number(process.env.DATABASE_PORT),
});

export default pg;