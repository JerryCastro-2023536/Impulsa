import { pool } from "../db/Conexion";
import { Favoritos } from "../models/Favoritos";
import { BaseRepository } from "./BaseRepository";

export class FavoritosRepository extends BaseRepository {
    async selectFavoritos(){
        const result = await pool.query(
            "SELECT * FROM favorito ORDER BY id_favorito"
        );
        return result.rows;
    }

    async selectFavoritoPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM favorito WHERE id_favorito = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertFavorito(favorito : Favoritos){
        const consulta = ` INSERT INTO favorito
            (
                id_usuario,
                id_oportunidad
            )

            VALUES

            (
                $1,$2
            )

            RETURNING *; 
            `;
        const values=[
            favorito.id_usuario,
            favorito.id_oportunidad
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateFavorito(id : number, favorito : Favoritos){
        const consulta = `UPDATE favorito SET 
            id_usuario=$1, id_oportunidad=$2
            WHERE id_favorito=$3
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            favorito.id_usuario,
            favorito.id_oportunidad,
            id
        ]);
        return result.rows[0];
    }

    async deleteFavorito(id : number){
        await pool.query("DELETE FROM favorito WHERE id_favorito = $1", [id]);
        return true;
    }

}
