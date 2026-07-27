import { Documento } from "../models/Documento";
import { DocumentoRepository } from "../repository/DocumentoRepository";

export class DocumentoService{
    dr = new DocumentoRepository();

    async mostrarDocumentos(): Promise<Documento[]> {
        return await this.dr.selectDocumento();
    }

    async crearDocumento(documento: Documento): Promise<Documento> {
        return await this.dr.insertDocumento(documento);
    }

    async buscarDocumentoPorId(id: number): Promise<Documento | undefined> {
        return await this.dr.selectDocumentoPorId(id);
    }

    async actualizarDocumento(id: number, documento: Documento): Promise<Documento> {
        return await this.dr.updateDocumento(id, documento);
    }

    async eliminarDocumento(id: number): Promise<boolean> {
        const existe = await this.dr.selectDocumentoPorId(id);
        if (!existe) {
            return false;
        }
        await this.dr.deleteDocumento(id);
        return true;
    }

    async agregarDocumento(documento: Documento): Promise<Documento> {
        return await this.crearDocumento(documento);
    }
}

