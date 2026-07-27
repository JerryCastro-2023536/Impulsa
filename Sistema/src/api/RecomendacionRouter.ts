import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { RecomendacionService } from "../service/RecomendacionService";
import { Recomendacion } from "../models/Recomendacion";
import { ReadBody } from "./readBody";

export async function RecomendacionRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const rs = new RecomendacionService();

    if (segmentos.length === 1 && segmentos[0] === "recomendaciones") {
        if (req.method === "GET") {
            return sendJson(res, 200, await rs.mostrarRecomendaciones()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const recomendacion = JSON.parse(body);
                const resultado = await rs.agregarRecomendacion(recomendacion);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "recomendaciones") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const recomendacion = await rs.buscarRecomendacionPorId(id);
            return sendJson(res, 200, recomendacion), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const recomendacion = JSON.parse(body);
                const resultado = await rs.actualizarRecomendacion(id, recomendacion);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await rs.eliminarRecomendacion(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Recomendación eliminada." } : { error: "Recomendación no encontrada." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
