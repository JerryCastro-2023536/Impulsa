import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { NotificacionService } from "../service/NotificacionService";
import { ReadBody } from "./readBody";

export async function NotificacionRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const ns = new NotificacionService();

    if (segmentos.length === 1 && segmentos[0] === "notificaciones") {
        if (req.method === "GET") {
            return sendJson(res, 200, await ns.mostrarNotificaciones()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const notificacion = JSON.parse(body);
                const resultado = await ns.agregarNotificacion(notificacion);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "notificaciones") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const notificacion = await ns.buscarNotificacionPorId(id);
            return sendJson(res, 200, notificacion), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const notificacion = JSON.parse(body);
                const resultado = await ns.actualizarNotificacion(id, notificacion);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await ns.eliminarNotificacion(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Notificación eliminada." } : { error: "Notificación no encontrada." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
