import { Habilidad } from "../models/Habilidad";

let habilidades: Habilidad[] = [];

export class HabilidadService {

    mostrarHabilidades(): Habilidad[] {
        return habilidades;
    }

    agregarHabilidad(habilidad: Habilidad): Habilidad {
        habilidades.push(habilidad);
        return habilidad;
    }

    buscarHabilidadPorId(id: number): Habilidad | undefined {
        return habilidades.find(h => h.id_habilidad === id);
    }

    actualizarHabilidad(id: number, habilidad: Habilidad): Habilidad | null {
        const dato = habilidades.find(h => h.id_habilidad === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, habilidad);
        return dato;
    }

    eliminarHabilidad(id: number): boolean {
        const indice = habilidades.findIndex(h => h.id_habilidad === id);
        if (indice !== -1) {
            habilidades.splice(indice, 1);
            return true;
        }
        return false;
    }

}
