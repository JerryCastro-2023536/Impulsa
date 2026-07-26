import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT_DATABASE);

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "ImpulsaDB",
    password : "admin",
    port : PORT
});

export async function testConexion() {
    try{
        const res = await pool.query("SELECT NOW()");
        console.log("Conexion exitosa" + res.rows);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}