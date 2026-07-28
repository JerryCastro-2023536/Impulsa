import { Oportunidad } from "../models/Oportunidad";
import { Estado } from "../enums/Estado";
import { isEmptyString, isInvalidNumber, isInvalidDate, isInvalidEnum } from "./validatorHelpers";
import { BaseRepository } from "../repository/BaseRepository";

const baseRepo = new BaseRepository();

export async function OportunidadValidate(oportunidad: Oportunidad) {
    const errores: string[] = [];

    if (isEmptyString(oportunidad.titulo)) {
        errores.push("titulo vacio");
    }
    if (isEmptyString(oportunidad.tipo)) {
        errores.push("tipo vacio");
    }
    if (isEmptyString(oportunidad.categoria)) {
        errores.push("categoria vacio");
    }
    if (isEmptyString(oportunidad.descripcion)) {
        errores.push("descripcion vacio");
    }
    if (isEmptyString(oportunidad.requisitos)) {
        errores.push("requisitos vacio");
    }
    if (isInvalidDate(oportunidad.fecha_publicacion)) {
        errores.push("fecha_publicacion vacia o invalida");
    }
    if (isInvalidDate(oportunidad.fecha_limite)) {
        errores.push("fecha_limite vacia o invalida");
    }
    if (isEmptyString(oportunidad.modalidad)) {
        errores.push("modalidad vacio");
    }
    if (isEmptyString(oportunidad.ubicacion)) {
        errores.push("ubicacion vacio");
    }
    if (oportunidad.foto === null || oportunidad.foto === undefined) {
        errores.push("foto vacio");
    }
    if (isInvalidEnum(Estado, oportunidad.estado)) {
        errores.push("estado vacio o invalido");
    }
    if (isInvalidNumber(oportunidad.id_organizacion)) {
        errores.push("id_organizacion vacio o invalido");
    } else if (!(await baseRepo.existe("organizacion", "id_organizacion", oportunidad.id_organizacion))) {
        errores.push("id_organizacion no existe");
    }

    return errores;
}
