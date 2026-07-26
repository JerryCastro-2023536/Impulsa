import { Estado } from "../enums/Estado";
import { RolUser } from "../enums/RolUser";

export interface Usuario{
    id_usuario : number,
    nombre : string,
    apellido : string,
    username : string,
    correo : string,
    password : string,
    telefono : number,
    fecha_registro : Date,
    rol : RolUser,
    estado : Estado
}