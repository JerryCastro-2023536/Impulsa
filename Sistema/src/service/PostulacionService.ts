import { Postulacion } from "../models/Postulacion";
import { PostulacionRepository } from "../repository/PostulacionRepository";

export class PostulacionService {
    pr = new PostulacionRepository();

    async mostrarPostulaciones(): Promise<Postulacion[]> {
        return await this.pr.selectPostulacion();
    }

    async crearPostulacion(postulacion: Postulacion): Promise<Postulacion> {
        return await this.pr.insertPostulacion(postulacion);
    }

    async buscarPostulacionPorId(id: number): Promise<Postulacion | undefined> {
        return await this.pr.selectPostulacionPorId(id);
    }

    async actualizarPostulacion(id: number, postulacion: Postulacion): Promise<Postulacion> {
        return await this.pr.updatePostulacion(id, postulacion);
    }

    async eliminarPostulacion(id: number): Promise<boolean> {
        const existe = await this.pr.selectPostulacionPorId(id);
        if (!existe) {
            return false;
        }
        await this.pr.deletePostulacion(id);
        return true;
    }

    async agregarPostulacion(postulacion: Postulacion): Promise<Postulacion> {
        return await this.crearPostulacion(postulacion);
    }

}
