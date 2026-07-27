import { Historial } from "../models/Historial";
import { HistorialRepository } from "../repository/HistorialRepository";

export class HistorialService {
    hr = new HistorialRepository();

    async mostrarHistoriales(): Promise<Historial[]> {
        return await this.hr.selectHistorial();
    }

    async crearHistorial(historial: Historial): Promise<Historial> {
        return await this.hr.insertHistorial(historial);
    }

    async buscarHistorialPorId(id: number): Promise<Historial | undefined> {
        return await this.hr.selectHistorialPorId(id);
    }

    async actualizarHistorial(id: number, historial: Historial): Promise<Historial> {
        return await this.hr.updateHistorial(id, historial);
    }

    async eliminarHistorial(id: number): Promise<boolean> {
        const existe = await this.hr.selectHistorialPorId(id);
        if (!existe) {
            return false;
        }
        await this.hr.deleteHistorial(id);
        return true;
    }

    async agregarHistorial(historial: Historial): Promise<Historial> {
        return await this.crearHistorial(historial);
    }

}
