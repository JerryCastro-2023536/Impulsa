export interface Notificacion{
    id_notificacion : number,
    titulo : string,
    mensaje : string,
    fecha_envio : Date,
    tipo : string,
    id_usuario : number,
    id_organizacion : number
}