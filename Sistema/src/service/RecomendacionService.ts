import { Recomendacion } from "../models/Recomendacion";
import { RecomendacionRepository } from "../repository/RecomendacionRepository";

export class RecomendacionService {
    rr = new RecomendacionRepository();

    async mostrarRecomendaciones(): Promise<Recomendacion[]> {
        return await this.rr.selectRecomendacion();
    }

    async crearRecomendacion(recomendacion: Recomendacion): Promise<Recomendacion> {
        return await this.rr.insertRecomendacion(recomendacion);
    }

    async buscarRecomendacionPorId(id: number): Promise<Recomendacion | undefined> {
        return await this.rr.selectRecomendacionPorId(id);
    }

    async actualizarRecomendacion(id: number, recomendacion: Recomendacion): Promise<Recomendacion> {
        return await this.rr.updateRecomendacion(id, recomendacion);
    }

    async eliminarRecomendacion(id: number): Promise<boolean> {
        const existe = await this.rr.selectRecomendacionPorId(id);
        if (!existe) {
            return false;
        }
        await this.rr.deleteRecomendacion(id);
        return true;
    }

    async agregarRecomendacion(recomendacion: Recomendacion): Promise<Recomendacion> {
        return await this.crearRecomendacion(recomendacion);
    }

}
