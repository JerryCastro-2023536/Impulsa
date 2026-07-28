import { Habilidad } from "../models/Habilidad";
import { isEmptyString, isInvalidNumber } from "./validatorHelpers";
import { BaseRepository } from "../repository/BaseRepository";

const baseRepo = new BaseRepository();

export async function HabilidadValidate(habilidad: Habilidad) {
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
    } else if (!(await baseRepo.existe("perfil", "id_perfil", habilidad.id_perfil))) {
        errores.push("id_perfil no existe");
    }

    return errores;
}
