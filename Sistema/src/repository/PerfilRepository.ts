import { pool } from "../db/Conexion";
import { Perfil } from "../models/Perfil";
import { BaseRepository } from "./BaseRepository";

export class PerfilRepository extends BaseRepository {
    async selectPerfil(){
        const result = await pool.query(
            "SELECT * FROM perfil ORDER BY id_perfil"
        );
        return result.rows;
    }

    async selectPerfilPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM perfil WHERE id_perfil = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertPerfil(perfil : Perfil){
        const consulta = ` INSERT INTO perfil
            (
                foto,
                institucion,
                carrera,
                biografia,
                experiencia_anios,
                links,
                rol,
                id_usuario
            )

            VALUES

            (
                $1,$2,$3,$4,$5,$6,$7,$8
            )

            RETURNING *; 
            `;
        const values=[
            perfil.foto,
            perfil.institucion,
            perfil.carrera,
            perfil.biografia,
            perfil.experiencia_anios,
            perfil.links,
            perfil.rol,
            perfil.id_usuario
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updatePerfil(id : number, perfil : Perfil){
        const consulta = `UPDATE perfil SET 
            foto=$1, institucion=$2, carrera=$3, biografia=$4, experiencia_anios=$5,
            links=$6, rol=$7, id_usuario=$8
            WHERE id_perfil=$9
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            perfil.foto,
            perfil.institucion,
            perfil.carrera,
            perfil.biografia,
            perfil.experiencia_anios,
            perfil.links,
            perfil.rol,
            perfil.id_usuario,
            id
        ]);
        return result.rows[0];
    }

    async deletePerfil(id : number){
        await pool.query("DELETE FROM perfil WHERE id_perfil = $1", [id]);
        return true;
    }
}
