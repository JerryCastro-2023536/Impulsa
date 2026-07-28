import { Favoritos } from "../models/Favoritos";
import { isInvalidNumber } from "./validatorHelpers";

export function FavoritosValidate(favorito: Favoritos) {
    const errores: string[] = [];

    if (isInvalidNumber(favorito.id_usuario)) {
        errores.push("id_usuario vacio o invalido");
    }
    if (isInvalidNumber(favorito.id_oportunidad)) {
        errores.push("id_oportunidad vacio o invalido");
    }

    return errores;
}
