import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT_DATABASE);
const PASSWORD = process.env.PASSWORD_DB;

export const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "dbimpulsa_in5cm",
    password : PASSWORD,
    port : PORT
});

export async function testConexion() {
    try{
        const res = await pool.query("SELECT * FROM usuario");
        console.log("Conexion exitosa" + res.rows);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}