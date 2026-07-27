import { Perfil } from "../models/Perfil";
import { PerfilRepository } from "../repository/PerfilRepository";

export class PerfilService {
    pr = new PerfilRepository();

    async mostrarPerfiles(): Promise<Perfil[]> {
        return await this.pr.selectPerfil();
    }

    async crearPerfil(perfil: Perfil): Promise<Perfil> {
        return await this.pr.insertPerfil(perfil);
    }

    async buscarPerfilPorId(id: number): Promise<Perfil | undefined> {
        return await this.pr.selectPerfilPorId(id);
    }

    async actualizarPerfil(id: number, perfil: Perfil): Promise<Perfil> {
        return await this.pr.updatePerfil(id, perfil);
    }

    async eliminarPerfil(id: number): Promise<boolean> {
        const existe = await this.pr.selectPerfilPorId(id);
        if (!existe) {
            return false;
        }
        await this.pr.deletePerfil(id);
        return true;
    }

    async agregarPerfil(perfil: Perfil): Promise<Perfil> {
        return await this.crearPerfil(perfil);
    }

}
