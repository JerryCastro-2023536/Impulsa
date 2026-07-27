import { Oportunidad } from "../models/Oportunidad";
import { OportunidadRepository } from "../repository/OportunidadRepository";

export class OportunidadService {
    or = new OportunidadRepository();

    async mostrarOportunidades(): Promise<Oportunidad[]> {
        return await this.or.selectOportunidad();
    }

    async crearOportunidad(oportunidad: Oportunidad): Promise<Oportunidad> {
        return await this.or.insertOportunidad(oportunidad);
    }

    async buscarOportunidadPorId(id: number): Promise<Oportunidad | undefined> {
        return await this.or.selectOportunidadPorId(id);
    }

    async actualizarOportunidad(id: number, oportunidad: Oportunidad): Promise<Oportunidad> {
        return await this.or.updateOportunidad(id, oportunidad);
    }

    async eliminarOportunidad(id: number): Promise<boolean> {
        const existe = await this.or.selectOportunidadPorId(id);
        if (!existe) {
            return false;
        }
        await this.or.deleteOportunidad(id);
        return true;
    }

    async agregarOportunidad(oportunidad: Oportunidad): Promise<Oportunidad> {
        return await this.crearOportunidad(oportunidad);
    }

}
