import { Organizacion } from "../models/Organizacion";
import { Estado } from "../enums/Estado";
import { TipoOrganizacion } from "../enums/TipoOrganizacion";
import { isEmptyString, isInvalidNumber, isInvalidDate, isInvalidEmail, isInvalidEnum } from "./validatorHelpers";

export function OrganizacionValidate(organizacion: Organizacion) {
    const errores: string[] = [];

    if (isEmptyString(organizacion.nombre)) {
        errores.push("nombre vacio");
    }
    if (organizacion.foto === null || organizacion.foto === undefined) {
        errores.push("foto vacio");
    }
    if (isInvalidEnum(TipoOrganizacion, organizacion.tipo)) {
        errores.push("tipo vacio o invalido");
    }
    if (isEmptyString(organizacion.descripcion)) {
        errores.push("descripcion vacio");
    }
    if (isInvalidEmail(organizacion.correo)) {
        errores.push("correo vacio o invalido");
    }
    if (isInvalidNumber(organizacion.telefono, 0)) {
        errores.push("telefono vacio o invalido");
    }
    if (isEmptyString(organizacion.sitio_web)) {
        errores.push("sitio_web vacio");
    }
    if (isEmptyString(organizacion.pais)) {
        errores.push("pais vacio");
    }
    if (isInvalidEnum(Estado, organizacion.estado)) {
        errores.push("estado vacio o invalido");
    }
    if (isInvalidDate(organizacion.fecha_registro)) {
        errores.push("fecha_registro vacia o invalida");
    }
    if (isInvalidNumber(organizacion.id_usuario)) {
        errores.push("id_usuario vacio o invalido");
    }

    return errores;
}
