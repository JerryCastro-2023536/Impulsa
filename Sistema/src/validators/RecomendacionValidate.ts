import { Recomendacion } from "../models/Recomendacion";
import { isInvalidNumber, isInvalidDate } from "./validatorHelpers";

export function RecomendacionValidate(recomendacion: Recomendacion) {
    const errores: string[] = [];

    if (isInvalidNumber(recomendacion.porcentaje, 0)) {
        errores.push("porcentaje vacio o invalido");
    }
    if (isInvalidDate(recomendacion.fecha_generacion)) {
        errores.push("fecha_generacion vacia o invalida");
    }
    if (isInvalidNumber(recomendacion.id_perfil)) {
        errores.push("id_perfil vacio o invalido");
    }
    if (isInvalidNumber(recomendacion.id_oportunidad)) {
        errores.push("id_oportunidad vacio o invalido");
    }

    return errores;
}
