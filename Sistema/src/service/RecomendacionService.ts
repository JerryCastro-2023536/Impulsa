import { Recomendacion } from "../models/Recomendacion";

let recomendaciones: Recomendacion[] = [];

export class RecomendacionService {

    mostrarRecomendaciones(): Recomendacion[] {
        return recomendaciones;
    }

    agregarRecomendacion(recomendacion: Recomendacion): Recomendacion {
        recomendaciones.push(recomendacion);
        return recomendacion;
    }

    buscarRecomendacionPorId(idPerfil: number, idOportunidad: number): Recomendacion | undefined {
        return recomendaciones.find(r => r.id_perfil === idPerfil && r.id_oportunidad === idOportunidad);
    }

    buscarRecomendacionPorPerfil(idPerfil: number): Recomendacion[] {
        return recomendaciones.filter(r => r.id_perfil === idPerfil);
    }

    buscarRecomendacionPorOportunidad(idOportunidad: number): Recomendacion[] {
        return recomendaciones.filter(r => r.id_oportunidad === idOportunidad);
    }

    actualizarRecomendacion(idPerfil: number, idOportunidad: number, recomendacion: Recomendacion): Recomendacion | null {
        const dato = recomendaciones.find(r => r.id_perfil === idPerfil && r.id_oportunidad === idOportunidad);
        if (!dato) {
            return null;
        }
        Object.assign(dato, recomendacion);
        return dato;
    }

    eliminarRecomendacion(idPerfil: number, idOportunidad: number): boolean {
        const indice = recomendaciones.findIndex(r => r.id_perfil === idPerfil && r.id_oportunidad === idOportunidad);
        if (indice !== -1) {
            recomendaciones.splice(indice, 1);
            return true;
        }
        return false;
    }

}
