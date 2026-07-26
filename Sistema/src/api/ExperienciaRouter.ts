import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { ExperienciaService } from "../service/ExperienciaService";
import { ReadBody } from "./readBody";

export async function ExperienciaRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const es = new ExperienciaService();

    if (segmentos.length === 1 && segmentos[0] === "experiencias") {
        if (req.method === "GET") {
            return sendJson(res, 200, es.mostrarExperiencias()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const experiencia = JSON.parse(body);
                const resultado = es.agregarExperiencia(experiencia);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "experiencias") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const experiencia = es.buscarExperienciaPorId(id);
            return sendJson(res, 200, experiencia), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const experiencia = JSON.parse(body);
                const resultado = await es.actualizarExperiencia(id, experiencia);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await es.eliminarExperiencia(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Experiencia eliminada." } : { error: "Experiencia no encontrada." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
