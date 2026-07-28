import { Experiencia } from "../models/Experiencia";
import { isEmptyString, isInvalidDate } from "./validatorHelpers";

export function ExperienciaValidate(experiencia: Experiencia) {
    const errores: string[] = [];

    if (isEmptyString(experiencia.empresa)) {
        errores.push("empresa vacio");
    }
    if (isEmptyString(experiencia.cargo)) {
        errores.push("cargo vacio");
    }
    if (isInvalidDate(experiencia.fecha_inicio)) {
        errores.push("fecha_inicio vacia o invalida");
    }
    if (isInvalidDate(experiencia.fecha_fin)) {
        errores.push("fecha_fin vacia o invalida");
    }

    return errores;
}
