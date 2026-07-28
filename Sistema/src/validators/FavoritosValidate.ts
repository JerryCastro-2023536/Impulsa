import { Favoritos } from "../models/Favoritos";
import { isInvalidNumber } from "./validatorHelpers";
import { BaseRepository } from "../repository/BaseRepository";

const baseRepo = new BaseRepository();

export async function FavoritosValidate(favorito: Favoritos) {
    const errores: string[] = [];

    if (isInvalidNumber(favorito.id_usuario)) {
        errores.push("id_usuario vacio o invalido");
    } else if (!(await baseRepo.existe("usuario", "id_usuario", favorito.id_usuario))) {
        errores.push("id_usuario no existe");
    }
    if (isInvalidNumber(favorito.id_oportunidad)) {
        errores.push("id_oportunidad vacio o invalido");
    } else if (!(await baseRepo.existe("oportunidad", "id_oportunidad", favorito.id_oportunidad))) {
        errores.push("id_oportunidad no existe");
    }

    return errores;
}
