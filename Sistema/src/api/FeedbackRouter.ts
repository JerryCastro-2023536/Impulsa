import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { FeedbackService } from "../service/FeedbackService";
import { ReadBody } from "./readBody";
import { FeedbackValidate } from "../validators/FeedbackValidate";

export async function FeedbackRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    const fs = new FeedbackService();

    if (segmentos.length === 1 && segmentos[0] === "feedback") {
        if (req.method === "GET") {
            return sendJson(res, 200, await fs.mostrarFeedbacks()), true;
        }
        if (req.method === "POST") {
            try {
                const body = await ReadBody(req);
                const feedback = JSON.parse(body);
                const errores = FeedbackValidate(feedback);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await fs.agregarFeedback(feedback);
                return sendJson(res, 201, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if (segmentos.length === 2 && segmentos[0] === "feedback") {
        const id = Number(segmentos[1]);
        if (req.method === "GET") {
            const feedback = await fs.buscarFeedbackPorId(id);
            return sendJson(res, 200, feedback), true;
        }
        if (req.method === "PUT") {
            try {
                const body = await ReadBody(req);
                const feedback = JSON.parse(body);
                const errores = FeedbackValidate(feedback);
                if (errores.length > 0) {
                    return sendJson(res, 400, { errores }), true;
                }
                const resultado = await fs.actualizarFeedback(id, feedback);
                return sendJson(res, 200, resultado), true;
            } catch (error) {
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }
        if (req.method === "DELETE") {
            const resultado = await fs.eliminarFeedback(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Feedback eliminado." } : { error: "Feedback no encontrado." }), true;
        }
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    return false;
}
