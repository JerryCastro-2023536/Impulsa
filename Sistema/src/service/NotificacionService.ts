import { Notificacion } from "../models/Notificacion";
import { NotificacionRepository } from "../repository/NotificacionRepository";

export class NotificacionService {
    nr = new NotificacionRepository();

    async mostrarNotificaciones(): Promise<Notificacion[]> {
        return await this.nr.selectNotificacion();
    }

    async crearNotificacion(notificacion: Notificacion): Promise<Notificacion> {
        return await this.nr.insertNotificacion(notificacion);
    }

    async buscarNotificacionPorId(id: number): Promise<Notificacion | undefined> {
        return await this.nr.selectNotificacionPorId(id);
    }

    async actualizarNotificacion(id: number, notificacion: Notificacion): Promise<Notificacion> {
        return await this.nr.updateNotificacion(id, notificacion);
    }

    async eliminarNotificacion(id: number): Promise<boolean> {
        const existe = await this.nr.selectNotificacionPorId(id);
        if (!existe) {
            return false;
        }
        await this.nr.deleteNotificacion(id);
        return true;
    }

    async agregarNotificacion(notificacion: Notificacion): Promise<Notificacion> {
        return await this.crearNotificacion(notificacion);
    }

}
