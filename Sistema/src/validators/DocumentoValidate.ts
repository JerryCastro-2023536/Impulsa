import { Documento } from "../models/Documento";
import { isEmptyString, isInvalidDate, isInvalidNumber } from "./validatorHelpers";
import { BaseRepository } from "../repository/BaseRepository";

const baseRepo = new BaseRepository();

export async function DocumentoValidate(documento: Documento) {
    const errores: string[] = [];

    if (isEmptyString(documento.nombre)) {
        errores.push("nombre vacio");
    }
    if (isEmptyString(documento.tipo_documento)) {
        errores.push("tipo_documento vacio");
    }
    if (documento.archivo === null || documento.archivo === undefined) {
        errores.push("archivo vacio");
    }
    if (isInvalidDate(documento.fecha_registro)) {
        errores.push("fecha_registro vacia o invalida");
    }
    if (isInvalidNumber(documento.id_perfil)) {
        errores.push("id_perfil vacio o invalido");
    } else if (!(await baseRepo.existe("perfil", "id_perfil", documento.id_perfil))) {
        errores.push("id_perfil no existe");
    }

    return errores;
}
