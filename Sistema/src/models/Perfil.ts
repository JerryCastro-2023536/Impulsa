export interface Perfil{
    id_perfil : number,
    foto : Blob,
    institucion : string,
    carrera : string,
    biografia : string,
    experiencia_anios : number,
    links : string,
    rol : string,
    fecha_registro : Date,
    id_usuario : number
}