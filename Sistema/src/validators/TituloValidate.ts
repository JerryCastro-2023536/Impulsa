import { Titulo } from "../models/Titulo";
import { isEmptyString, isInvalidNumber } from "./validatorHelpers";

export function TituloValidate(titulo: Titulo) {
    const errores: string[] = [];

    if (isEmptyString(titulo.titulo)) {
        errores.push("titulo vacio");
    }
    if (isEmptyString(titulo.descripcion)) {
        errores.push("descripcion vacio");
    }
    if (isInvalidNumber(titulo.id_perfil)) {
        errores.push("id_perfil vacio o invalido");
    }

    return errores;
}
