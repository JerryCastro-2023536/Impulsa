import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { HistorialService } from "../service/HistorialService";
import { ReadBody } from "./readBody";
import { HistorialValidate } from "../validators/HistorialValidate";

export async function HistorialRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const hs = new HistorialService();

    if (segmentos.length === 1 && segmentos[0] === "historiales") {
        if (req.method === "GET") {
            return sendJson(res, 200, await hs.mostrarHistoriales()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const historial = JSON.parse(body);
                const errores = await HistorialValidate(historial);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await hs.agregarHistorial(historial);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "historiales") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const historial = await hs.buscarHistorialPorId(id);
            return sendJson(res, 200, historial), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const historial = JSON.parse(body);
                const errores = await HistorialValidate(historial);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await hs.actualizarHistorial(id, historial);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await hs.eliminarHistorial(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Historial eliminado." } : { error: "Historial no encontrado." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
