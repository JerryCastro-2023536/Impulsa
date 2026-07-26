import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { PerfilService } from "../service/PerfilService";
import { ReadBody } from "./readBody";

export async function PerfilRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const ps = new PerfilService();

    if (segmentos.length === 1 && segmentos[0] === "perfiles") {
        if (req.method === "GET") {
            return sendJson(res, 200, ps.mostrarPerfiles()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const perfil = JSON.parse(body);
                const resultado = ps.agregarPerfil(perfil);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "perfiles") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const perfil = ps.buscarPerfilPorId(id);
            return sendJson(res, 200, perfil), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const perfil = JSON.parse(body);
                const resultado = await ps.actualizarPerfil(id, perfil);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await ps.eliminarPerfil(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Perfil eliminado." } : { error: "Perfil no encontrado." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
