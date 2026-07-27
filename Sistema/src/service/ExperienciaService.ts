import { Experiencia } from "../models/Experiencia";
import { ExperienciaRepository } from "../repository/ExperienciaRepository";

export class ExperienciaService {
    er = new ExperienciaRepository();

    async mostrarExperiencias(): Promise<Experiencia[]> {
        return await this.er.selectExperiencia();
    }

    async crearExperiencia(experiencia: Experiencia): Promise<Experiencia> {
        return await this.er.insertExperiencia(experiencia);
    }

    async buscarExperienciaPorId(id: number): Promise<Experiencia | undefined> {
        return await this.er.selectExperienciaPorId(id);
    }

    async actualizarExperiencia(id: number, experiencia: Experiencia): Promise<Experiencia> {
        return await this.er.updateExperiencia(id, experiencia);
    }

    async eliminarExperiencia(id: number): Promise<boolean> {
        const existe = await this.er.selectExperienciaPorId(id);
        if (!existe) {
            return false;
        }
        await this.er.deleteExperiencia(id);
        return true;
    }

    async agregarExperiencia(experiencia: Experiencia): Promise<Experiencia> {
        return await this.crearExperiencia(experiencia);
    }

}
