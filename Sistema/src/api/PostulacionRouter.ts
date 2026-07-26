import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { PostulacionService } from "../service/PostulacionService";
import { ReadBody } from "./readBody";

export async function PostulacionRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const ps = new PostulacionService();

    if (segmentos.length === 1 && segmentos[0] === "postulaciones") {
        if (req.method === "GET") {
            return sendJson(res, 200, ps.mostrarPostulaciones()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const postulacion = JSON.parse(body);
                const resultado = ps.agregarPostulacion(postulacion);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "postulaciones") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const postulacion = ps.buscarPostulacionPorId(id);
            return sendJson(res, 200, postulacion), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const postulacion = JSON.parse(body);
                const resultado = await ps.actualizarPostulacion(id, postulacion);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await ps.eliminarPostulacion(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Postulación eliminada." } : { error: "Postulación no encontrada." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
