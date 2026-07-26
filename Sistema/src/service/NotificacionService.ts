import { Notificacion } from "../models/Notificacion";

let notificaciones: Notificacion[] = [];

export class NotificacionService {

    mostrarNotificaciones(): Notificacion[] {
        return notificaciones;
    }

    agregarNotificacion(notificacion: Notificacion): Notificacion {
        notificaciones.push(notificacion);
        return notificacion;
    }

    buscarNotificacionPorId(id: number): Notificacion | undefined {
        return notificaciones.find(n => n.id_notificacion === id);
    }

    actualizarNotificacion(id: number, notificacion: Notificacion): Notificacion | null {
        const dato = notificaciones.find(n => n.id_notificacion === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, notificacion);
        return dato;
    }

    eliminarNotificacion(id: number): boolean {
        const indice = notificaciones.findIndex(n => n.id_notificacion === id);
        if (indice !== -1) {
            notificaciones.splice(indice, 1);
            return true;
        }
        return false;
    }

}
