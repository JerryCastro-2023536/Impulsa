import { Postulacion } from "../models/Postulacion";
import { Estado } from "../enums/Estado";
import { isEmptyString, isInvalidNumber, isInvalidDate, isInvalidEnum } from "./validatorHelpers";

export function PostulacionValidate(postulacion: Postulacion) {
    const errores: string[] = [];

    if (isInvalidDate(postulacion.fecha_postulacion)) {
        errores.push("fecha_postulacion vacia o invalida");
    }
    if (isInvalidEnum(Estado, postulacion.estado)) {
        errores.push("estado vacio o invalido");
    }
    if (isEmptyString(postulacion.observaciones)) {
        errores.push("observaciones vacio");
    }
    if (isInvalidNumber(postulacion.id_perfil)) {
        errores.push("id_perfil vacio o invalido");
    }
    if (isInvalidNumber(postulacion.id_oportunidad)) {
        errores.push("id_oportunidad vacio o invalido");
    }

    return errores;
}
