import { Habilidad } from "../models/Habilidad";
import { isEmptyString, isInvalidNumber } from "./validatorHelpers";

export function HabilidadValidate(habilidad: Habilidad) {
    const errores: string[] = [];

    if (isEmptyString(habilidad.nombre)) {
        errores.push("nombre vacio");
    }
    if (isEmptyString(habilidad.descripcion)) {
        errores.push("descripcion vacio");
    }
    if (isEmptyString(habilidad.nivel)) {
        errores.push("nivel vacio");
    }
    if (isInvalidNumber(habilidad.id_perfil)) {
        errores.push("id_perfil vacio o invalido");
    }

    return errores;
}
