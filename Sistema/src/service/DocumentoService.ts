import { Documento } from "../models/Documento";

let documentos : Documento[] = [];

export class DocumentoService{

    mostrarDocumentos() : Documento[]{
        return documentos;
    }

    agregarDocumento(documento : Documento) : Documento{
        documentos.push(documento);
        return documento;
    }

    buscarDocumentoPorId(id : number) : Documento | undefined{
        return documentos.find(d => d.id_documento === id);
    }

    actualizarDocumento(id : number, documento : Documento) : Documento | null{
        const dato = documentos.find(d => d.id_documento === id);
        if(!dato){
            return null
        }
        Object.assign(dato, documento);
        
        return documento;

    }

    eliminarDocumento(id : number) : boolean{
        const indice = documentos.findIndex(d => d.id_documento === id);
        documentos.splice(indice, 1);
        return false;
    } 

}