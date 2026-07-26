import { Postulacion } from "../models/Postulacion";

let postulaciones: Postulacion[] = [];

export class PostulacionService {

    mostrarPostulaciones(): Postulacion[] {
        return postulaciones;
    }

    agregarPostulacion(postulacion: Postulacion): Postulacion {
        postulaciones.push(postulacion);
        return postulacion;
    }

    buscarPostulacionPorId(id: number): Postulacion | undefined {
        return postulaciones.find(p => p.id_postulacion === id);
    }

    actualizarPostulacion(id: number, postulacion: Postulacion): Postulacion | null {
        const dato = postulaciones.find(p => p.id_postulacion === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, postulacion);
        return dato;
    }

    eliminarPostulacion(id: number): boolean {
        const indice = postulaciones.findIndex(p => p.id_postulacion === id);
        if (indice !== -1) {
            postulaciones.splice(indice, 1);
            return true;
        }
        return false;
    }

}
