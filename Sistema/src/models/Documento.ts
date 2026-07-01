export interface Documento{
    id_documento : number,
    nombre : string,
    tipo_documento : string,
    archivo : Blob,
    fecha_registro : Date,
    id_oportunidad : number
}