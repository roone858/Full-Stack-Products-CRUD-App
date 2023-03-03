import dotenv from "dotenv"
import { Pool } from 'postgres-pool';

dotenv.config()


const client = new Pool({
  host: process.env.HOST,
  database:process.env.DATABASE,
  user: process.env.USER,
  password:process.env.PASSWORD,
  port: process.env.PORT,
});

export default client;

