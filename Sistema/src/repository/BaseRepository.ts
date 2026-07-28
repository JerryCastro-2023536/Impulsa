import { pool } from "../db/Conexion";

export class BaseRepository {
    async existe(tabla: string, columna: string, id: number): Promise<boolean> {
        if (!this.isValidIdentifier(tabla) || !this.isValidIdentifier(columna)) {
            return false;
        }

        const result = await pool.query(
            `SELECT 1 FROM ${tabla} WHERE ${columna} = $1`,
            [id]
        );

        return result.rowCount! > 0;
    }

    private isValidIdentifier(value: string): boolean {
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
    }
}
