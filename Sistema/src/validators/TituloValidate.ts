import { Titulo } from "../models/Titulo";
import { isEmptyString, isInvalidNumber } from "./validatorHelpers";
import { BaseRepository } from "../repository/BaseRepository";

const baseRepo = new BaseRepository();

export async function TituloValidate(titulo: Titulo) {
    const errores: string[] = [];

    if (isEmptyString(titulo.titulo)) {
        errores.push("titulo vacio");
    }
    if (isEmptyString(titulo.descripcion)) {
        errores.push("descripcion vacio");
    }
    if (isInvalidNumber(titulo.id_perfil)) {
        errores.push("id_perfil vacio o invalido");
    } else if (!(await baseRepo.existe("perfil", "id_perfil", titulo.id_perfil))) {
        errores.push("id_perfil no existe");
    }

    return errores;
}
