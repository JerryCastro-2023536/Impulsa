import { Notificacion } from "../models/Notificacion";
import { isEmptyString, isInvalidNumber, isInvalidDate } from "./validatorHelpers";

export function NotificacionValidate(notificacion: Notificacion) {
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
    }
    if (isInvalidNumber(notificacion.id_organizacion)) {
        errores.push("id_organizacion vacio o invalido");
    }

    return errores;
}
