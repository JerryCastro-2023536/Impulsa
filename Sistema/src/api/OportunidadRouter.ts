import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { OportunidadService } from "../service/OportunidadService";
import { ReadBody } from "./readBody";
import { OportunidadValidate } from "../validators/OportunidadValidate";

export async function OportunidadRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const os = new OportunidadService();

    if (segmentos.length === 1 && segmentos[0] === "oportunidades") {
        if (req.method === "GET") {
            return sendJson(res, 200, await os.mostrarOportunidades()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const oportunidad = JSON.parse(body);
                const errores = OportunidadValidate(oportunidad);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await os.agregarOportunidad(oportunidad);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "oportunidades") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const oportunidad = await os.buscarOportunidadPorId(id);
            return sendJson(res, 200, oportunidad), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const oportunidad = JSON.parse(body);
                const errores = OportunidadValidate(oportunidad);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await os.actualizarOportunidad(id, oportunidad);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await os.eliminarOportunidad(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Oportunidad eliminada." } : { error: "Oportunidad no encontrada." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
