import { Habilidad } from "../models/Habilidad";
import { HabilidadRepository } from "../repository/HabilidadRepository";

export class HabilidadService {
    hr = new HabilidadRepository();

    async mostrarHabilidades(): Promise<Habilidad[]> {
        return await this.hr.selectHabilidad();
    }

    async crearHabilidad(habilidad: Habilidad): Promise<Habilidad> {
        return await this.hr.insertHabilidad(habilidad);
    }

    async buscarHabilidadPorId(id: number): Promise<Habilidad | undefined> {
        return await this.hr.selectHabilidadPorId(id);
    }

    async actualizarHabilidad(id: number, habilidad: Habilidad): Promise<Habilidad> {
        return await this.hr.updateHabilidad(id, habilidad);
    }

    async eliminarHabilidad(id: number): Promise<boolean> {
        const existe = await this.hr.selectHabilidadPorId(id);
        if (!existe) {
            return false;
        }
        await this.hr.deleteHabilidad(id);
        return true;
    }

    async agregarHabilidad(habilidad: Habilidad): Promise<Habilidad> {
        return await this.crearHabilidad(habilidad);
    }

}
