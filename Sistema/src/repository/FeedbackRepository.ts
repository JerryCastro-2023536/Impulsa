import { pool } from "../db/Conexion";
import { Feedback } from "../models/Feedback";
import { BaseRepository } from "./BaseRepository";

export class FeedbackRepository extends BaseRepository {
    async selectFeedback(){
        const result = await pool.query(
            "SELECT * FROM feedback ORDER BY id_feedback"
        );
        return result.rows;
    }

    async selectFeedbackPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM feedback WHERE id_feedback = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertFeedback(feedback : Feedback){
        const consulta = ` INSERT INTO feedback
            (
                mensaje,
                calificacion,
                fecha,
                id_usuario
            )

            VALUES

            (
                $1,$2,$3,$4
            )

            RETURNING *; 
            `;
        const values=[
            feedback.mensaje,
            feedback.calificacion,
            feedback.fecha,
            feedback.id_usuario
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateFeedback(id : number, feedback : Feedback){
        const consulta = `UPDATE feedback SET 
            mensaje=$1, calificacion=$2, fecha=$3, id_usuario=$4
            WHERE id_feedback=$5
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            feedback.mensaje,
            feedback.calificacion,
            feedback.fecha,
            feedback.id_usuario,
            id
        ]);
        return result.rows[0];
    }

    async deleteFeedback(id : number){
        await pool.query("DELETE FROM feedback WHERE id_feedback = $1", [id]);
        return true;
    }

}
