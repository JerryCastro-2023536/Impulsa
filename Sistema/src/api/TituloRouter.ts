import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { TituloService } from "../service/TituloService";
import { ReadBody } from "./readBody";
import { TituloValidate } from "../validators/TituloValidate";

export async function TituloRouter(req : IncomingMessage, res : ServerResponse) : Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const ms = new TituloService();

    if(segmentos.length === 1 && segmentos[0] === "titulos"){
        if(req.method === "GET"){
            return sendJson(res, 200, await ms.mostrarTitulos()), true;
        }
        if(req.method === "POST"){
            try{
                const body = await ReadBody(req);
                const titulo = JSON.parse(body);
                const errores = await TituloValidate(titulo);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await ms.agregarTitulo(titulo);
                return sendJson(res, 201, resultado), true;
            }catch(error){
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
    }
    
    if(segmentos.length === 2 && segmentos[0] === "titulos"){
        const id = Number(segmentos[1]);
        if(req.method === "GET"){
            const titulo = await ms.buscarTituloPorId(id);
            return sendJson(res, 200, titulo), true;
        }

        if(req.method === "PUT"){
            try{
                const body = await ReadBody(req);
                const titulo = JSON.parse(body);
                const errores = await TituloValidate(titulo);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await ms.actualizarTitulo(id, titulo);
                return sendJson(res, 200, resultado), true;
            }catch(error){
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;               
            }
        }

        if(req.method === "DELETE"){
            const resultado = await ms.eliminarTitulo(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Titulo eliminado." } : { error: "Titulo no encontrado." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }
    return false;
}