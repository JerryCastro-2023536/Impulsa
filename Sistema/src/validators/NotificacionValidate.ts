import { Notificacion } from "../models/Notificacion";
import { isEmptyString, isInvalidNumber, isInvalidDate } from "./validatorHelpers";
import { BaseRepository } from "../repository/BaseRepository";

const baseRepo = new BaseRepository();

export async function NotificacionValidate(notificacion: Notificacion) {
    const errores: string[] = [];

    if (isEmptyString(notificacion.titulo)) {
        errores.push("titulo vacio");
    }
    if (isEmptyString(notificacion.mensaje)) {
        errores.push("mensaje vacio");
    }
    if (isInvalidDate(notificacion.fecha_envio)) {
        errores.push("fecha_envio vacia o invalida");
    }
    if (isEmptyString(notificacion.tipo)) {
        errores.push("tipo vacio");
    }
    if (isInvalidNumber(notificacion.id_perfil)) {
        errores.push("id_perfil vacio o invalido");
    } else if (!(await baseRepo.existe("perfil", "id_perfil", notificacion.id_perfil))) {
        errores.push("id_perfil no existe");
    }
    if (isInvalidNumber(notificacion.id_organizacion)) {
        errores.push("id_organizacion vacio o invalido");
    } else if (!(await baseRepo.existe("organizacion", "id_organizacion", notificacion.id_organizacion))) {
        errores.push("id_organizacion no existe");
    }

    return errores;
}
