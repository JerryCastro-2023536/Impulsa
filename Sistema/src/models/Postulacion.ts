import { Estado } from "../enums/Estado";

export interface Postulacion{
    id_postulacion : number,
    fecha_postulacion : Date,
    estado : Estado,
    observaciones : string,
    id_perfil : number,
    id_oportunidad : number
}