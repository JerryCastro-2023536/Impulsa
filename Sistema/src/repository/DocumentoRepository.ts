import { pool } from "../db/Conexion";
import { Documento } from "../models/Documento";

export class DocumentoRepository{
    async selectDocumento(){
        const result = await pool.query(
            "SELECT * FROM documento ORDER BY id_documento"
        );
        return result.rows;
    }

    async selectDocumentoPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM documento WHERE id_documento = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertDocumento(documento : Documento){
        const consulta = ` INSERT INTO documento
            (
                nombre,
                tipo_documento,
                archivo,
                fecha_registro,
                id_perfil
            )

            VALUES

            (
                $1,$2,$3,$4,$5
            )

            RETURNING *; 
            `;
        const values=[
            documento.nombre,
            documento.tipo_documento,
            documento.archivo,
            documento.fecha_registro,
            documento.id_perfil
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateDocumento(id : number, documento : Documento){
        const consulta = `UPDATE documento SET 
            nombre=$1, tipo_documento=$2, archivo=$3, fecha_registro=$4, id_perfil=$5
            WHERE id_documento=$6
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            documento.nombre,
            documento.tipo_documento,
            documento.archivo,
            documento.fecha_registro,
            documento.id_perfil,
            id
        ]);
        return result.rows[0];
    }

    async deleteDocumento(id : number){
        await pool.query("DELETE FROM documento WHERE id_documento = $1", [id]);
        return true;
    }

}
