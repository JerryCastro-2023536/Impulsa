import { Historial } from "../models/Historial";

let historiales: Historial[] = [];

export class HistorialService {

    mostrarHistoriales(): Historial[] {
        return historiales;
    }

    agregarHistorial(historial: Historial): Historial {
        historiales.push(historial);
        return historial;
    }

    buscarHistorialPorId(id: number): Historial | undefined {
        return historiales.find(h => h.id_historial === id);
    }

    actualizarHistorial(id: number, historial: Historial): Historial | null {
        const dato = historiales.find(h => h.id_historial === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, historial);
        return dato;
    }

    eliminarHistorial(id: number): boolean {
        const indice = historiales.findIndex(h => h.id_historial === id);
        if (indice !== -1) {
            historiales.splice(indice, 1);
            return true;
        }
        return false;
    }

}
