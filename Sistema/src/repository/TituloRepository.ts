import { pool } from "../db/Conexion";
import { Titulo } from "../models/Titulo";
import { BaseRepository } from "./BaseRepository";

export class TituloRepository extends BaseRepository {
    async selectTitulo(){
        const result = await pool.query(
            "SELECT * FROM titulo ORDER BY id_titulo"
        );
        return result.rows;
    }

    async selectTituloPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM titulo WHERE id_titulo = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertTitulo(titulo : Titulo){
        const consulta = ` INSERT INTO titulo
            (
                titulo,
                descripcion,
                id_perfil
            )

            VALUES

            (
                $1,$2,$3
            )

            RETURNING *; 
            `;
        const values=[
            titulo.titulo,
            titulo.descripcion,
            titulo.id_perfil
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateTitulo(id : number, titulo : Titulo){
        const consulta = `UPDATE titulo SET 
            titulo=$1, descripcion=$2, id_perfil=$3
            WHERE id_titulo=$4
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            titulo.titulo,
            titulo.descripcion,
            titulo.id_perfil,
            id
        ]);
        return result.rows[0];
    }

    async deleteTitulo(id : number){
        await pool.query("DELETE FROM titulo WHERE id_titulo = $1", [id]);
        return true;
    }
}
