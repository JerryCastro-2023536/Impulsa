import { pool } from "../db/Conexion";
import { Usuario } from "../models/Usuario";

export class UsuarioRepository{
    async selectUsuario(){
        const result = await pool.query(
            "SELECT * FROM usuario ORDER BY id_usuario"
        );
        return result.rows;
    }

    async selectUsuarioPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM usuario WHERE id_usuario = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertUsuario(usuario : Usuario){
        const consulta =  ` INSERT INTO Usuario
            (
                nombre,
                apellido,
                username,
                correo,
                password,
                telefono,
                rol,
                estado,
                fecha_registro
            )

            VALUES

            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9
            )

            RETURNING *; 
            `;
        const values=[

            usuario.nombre,
            usuario.apellido,
            usuario.username,
            usuario.correo,
            usuario.password,
            usuario.telefono,
            usuario.rol,
            usuario.estado,
            usuario.fecha_registro

        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateUsuario(id : number, usuario : Usuario){
        const consulta = `UPDATE usuario SET 
            nombre=$1, apellido=$2, username=$3, correo=$4, password=$5, telefono=$6, rol=$7, 
            estado=$8, fecha_registro=$9
            WHERE id_usuario=$10
            RETURNING *;`
            
        const result = await pool.query(consulta, [
            usuario.nombre,
            usuario.apellido,
            usuario.username,
            usuario.correo,
            usuario.password,
            usuario.telefono,
            usuario.rol,
            usuario.estado,
            usuario.fecha_registro, 
            id
        ]);
        return result.rows[0];
    }

    async deleteUsuario(id : number){
        await pool.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);
        return true;
    }

}