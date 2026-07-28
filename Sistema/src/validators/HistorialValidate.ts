import { Historial } from "../models/Historial";
import { isEmptyString, isInvalidNumber, isInvalidDate } from "./validatorHelpers";
import { BaseRepository } from "../repository/BaseRepository";

const baseRepo = new BaseRepository();

export async function HistorialValidate(historial: Historial) {
    const errores: string[] = [];

    if (isEmptyString(historial.pregunta)) {
        errores.push("pregunta vacio");
    }
    if (isEmptyString(historial.respuesta)) {
        errores.push("respuesta vacio");
    }
    if (isInvalidDate(historial.fecha)) {
        errores.push("fecha vacia o invalida");
    }
    if (isInvalidNumber(historial.id_perfil)) {
        errores.push("id_perfil vacio o invalido");
    } else if (!(await baseRepo.existe("perfil", "id_perfil", historial.id_perfil))) {
        errores.push("id_perfil no existe");
    }

    return errores;
}
