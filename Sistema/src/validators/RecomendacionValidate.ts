import { Recomendacion } from "../models/Recomendacion";
import { isInvalidNumber, isInvalidDate } from "./validatorHelpers";
import { BaseRepository } from "../repository/BaseRepository";

const baseRepo = new BaseRepository();

export async function RecomendacionValidate(recomendacion: Recomendacion) {
    const errores: string[] = [];

    if (isInvalidNumber(recomendacion.porcentaje, 0)) {
        errores.push("porcentaje vacio o invalido");
    }
    if (isInvalidDate(recomendacion.fecha_generacion)) {
        errores.push("fecha_generacion vacia o invalida");
    }
    if (isInvalidNumber(recomendacion.id_perfil)) {
        errores.push("id_perfil vacio o invalido");
    } else if (!(await baseRepo.existe("perfil", "id_perfil", recomendacion.id_perfil))) {
        errores.push("id_perfil no existe");
    }
    if (isInvalidNumber(recomendacion.id_oportunidad)) {
        errores.push("id_oportunidad vacio o invalido");
    } else if (!(await baseRepo.existe("oportunidad", "id_oportunidad", recomendacion.id_oportunidad))) {
        errores.push("id_oportunidad no existe");
    }

    return errores;
}
