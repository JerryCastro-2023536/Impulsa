import { Experiencia } from "../models/Experiencia";

let experiencias: Experiencia[] = [];

export class ExperienciaService {

    mostrarExperiencias(): Experiencia[] {
        return experiencias;
    }

    agregarExperiencia(experiencia: Experiencia): Experiencia {
        experiencias.push(experiencia);
        return experiencia;
    }

    buscarExperienciaPorId(id: number): Experiencia | undefined {
        return experiencias.find(e => e.id_experiencia === id);
    }

    actualizarExperiencia(id: number, experiencia: Experiencia): Experiencia | null {
        const dato = experiencias.find(e => e.id_experiencia === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, experiencia);
        return dato;
    }

    eliminarExperiencia(id: number): boolean {
        const indice = experiencias.findIndex(e => e.id_experiencia === id);
        if (indice !== -1) {
            experiencias.splice(indice, 1);
            return true;
        }
        return false;
    }

}
