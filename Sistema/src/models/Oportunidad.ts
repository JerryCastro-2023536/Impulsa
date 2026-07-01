import { Estado } from "../enums/Estado";

export interface Oportunidad{
    id_oportunidad : number,
    titulo : string,
    tipo : string,
    categoria : string,
    descripcion : string,
    requisitos : string,
    fecha_publicacion : Date,
    fecha_limite : Date,
    modalidad : string,
    ubicacion : string,
    foto : Blob,
    estado : Estado,
    id_organizacion : number
}