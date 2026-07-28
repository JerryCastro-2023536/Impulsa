import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { HabilidadService } from "../service/HabilidadService";
import { ReadBody } from "./readBody";
import { HabilidadValidate } from "../validators/HabilidadValidate";

export async function HabilidadRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const hs = new HabilidadService();

    if (segmentos.length === 1 && segmentos[0] === "habilidades") {
        if (req.method === "GET") {
            return sendJson(res, 200, await hs.mostrarHabilidades()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const habilidad = JSON.parse(body);
                const errores = HabilidadValidate(habilidad);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await hs.agregarHabilidad(habilidad);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "habilidades") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const habilidad = await hs.buscarHabilidadPorId(id);
            return sendJson(res, 200, habilidad), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const habilidad = JSON.parse(body);
                const errores = HabilidadValidate(habilidad);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await hs.actualizarHabilidad(id, habilidad);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await hs.eliminarHabilidad(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Habilidad eliminada." } : { error: "Habilidad no encontrada." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
