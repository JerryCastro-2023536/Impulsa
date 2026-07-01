import { Estado } from "../enums/Estado"
import { TipoOrganizacion } from "../enums/TipoOrganizacion"

export interface Organizacion{
    id_organizacion : number,
    nombre : string,
    foto : Blob,
    tipo : TipoOrganizacion,
    descripcion : string,
    correo : string,
    telefono : number,
    sitio_web : string,
    pais : string,
    estado : Estado,
    fecha_registro : Date,
    id_usario : number
}
