import { Oportunidad } from "../models/Oportunidad";

let oportunidades: Oportunidad[] = [];

export class OportunidadService {

    mostrarOportunidades(): Oportunidad[] {
        return oportunidades;
    }

    agregarOportunidad(oportunidad: Oportunidad): Oportunidad {
        oportunidades.push(oportunidad);
        return oportunidad;
    }

    buscarOportunidadPorId(id: number): Oportunidad | undefined {
        return oportunidades.find(o => o.id_oportunidad === id);
    }

    actualizarOportunidad(id: number, oportunidad: Oportunidad): Oportunidad | null {
        const dato = oportunidades.find(o => o.id_oportunidad === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, oportunidad);
        return dato;
    }

    eliminarOportunidad(id: number): boolean {
        const indice = oportunidades.findIndex(o => o.id_oportunidad === id);
        if (indice !== -1) {
            oportunidades.splice(indice, 1);
            return true;
        }
        return false;
    }

}
