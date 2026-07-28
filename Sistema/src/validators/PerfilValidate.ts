import { Perfil } from "../models/Perfil";
import { isEmptyString, isInvalidNumber, isInvalidDate } from "./validatorHelpers";

export function PerfilValidate(perfil: Perfil) {
    const errores: string[] = [];

    if (perfil.foto === null || perfil.foto === undefined) {
        errores.push("foto vacio");
    }
    if (isEmptyString(perfil.institucion)) {
        errores.push("institucion vacio");
    }
    if (isEmptyString(perfil.carrera)) {
        errores.push("carrera vacio");
    }
    if (isEmptyString(perfil.biografia)) {
        errores.push("biografia vacio");
    }
    if (isInvalidNumber(perfil.experiencia_anios, 0)) {
        errores.push("experiencia_anios vacio o invalido");
    }
    if (isEmptyString(perfil.links)) {
        errores.push("links vacio");
    }
    if (isEmptyString(perfil.rol)) {
        errores.push("rol vacio");
    }
    if (isInvalidDate(perfil.fecha_registro)) {
        errores.push("fecha_registro vacia o invalida");
    }
    if (isInvalidNumber(perfil.id_usuario)) {
        errores.push("id_usuario vacio o invalido");
    }

    return errores;
}
