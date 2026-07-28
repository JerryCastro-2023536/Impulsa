import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { OrganizacionService } from "../service/OrganizacionService";
import { ReadBody } from "./readBody";
import { OrganizacionValidate } from "../validators/OrganizacionValidate";

export async function OrganizacionRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const os = new OrganizacionService();

    if (segmentos.length === 1 && segmentos[0] === "organizaciones") {
        if (req.method === "GET") {
            return sendJson(res, 200, await os.mostrarOrganizaciones()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const organizacion = JSON.parse(body);
                const errores = await OrganizacionValidate(organizacion);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await os.agregarOrganizacion(organizacion);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "organizaciones") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const organizacion = await os.buscarOrganizacionPorId(id);
            return sendJson(res, 200, organizacion), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const organizacion = JSON.parse(body);
                const errores = await OrganizacionValidate(organizacion);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await os.actualizarOrganizacion(id, organizacion);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await os.eliminarOrganizacion(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Organización eliminada." } : { error: "Organización no encontrada." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
