import { Titulo } from "../models/Titulo";
import { TituloRepository } from "../repository/TituloRepository";

export class TituloService{
    tr = new TituloRepository();

    async mostrarTitulos(): Promise<Titulo[]> {
        return await this.tr.selectTitulo();
    }

    async crearTitulo(titulo: Titulo): Promise<Titulo> {
        return await this.tr.insertTitulo(titulo);
    }

    async buscarTituloPorId(id: number): Promise<Titulo | undefined> {
        return await this.tr.selectTituloPorId(id);
    }

    async actualizarTitulo(id: number, titulo: Titulo): Promise<Titulo> {
        return await this.tr.updateTitulo(id, titulo);
    }

    async eliminarTitulo(id: number): Promise<boolean> {
        const existe = await this.tr.selectTituloPorId(id);
        if (!existe) {
            return false;
        }
        await this.tr.deleteTitulo(id);
        return true;
    }

    async agregarTitulo(titulo: Titulo): Promise<Titulo> {
        return await this.crearTitulo(titulo);
    }

}