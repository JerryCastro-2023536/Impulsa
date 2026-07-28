import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./SendJson";
import { UsuarioService } from "../service/UsuarioService";
import { ReadBody } from "./readBody";
import { UsuarioValidate } from "../validators/UsuarioValidate";

const us = new UsuarioService();

export async function UsuarioRouter(req : IncomingMessage, res : ServerResponse) : Promise<boolean>{
    const url = req.url ?? "";
    const [path] = url.split("?");
    const segmentos = path.split("/").filter(Boolean);

    if(segmentos.length === 1 && segmentos[0] === "usuarios"){
        if(req.method === "GET"){
            const usuarios = await us.mostrarUsuarios();
            return sendJson(res, 200, usuarios), true;
        }

        if(req.method === "POST"){
            try{
                const body = await ReadBody(req);
                const user = JSON.parse(body);
                const errores = await UsuarioValidate(user);
                if(errores.length > 0){
                    return sendJson(res, 400, {errores}), true;
                }
                const resultado = await us.crearUsuario(user);
                return sendJson(res, 201, resultado), true;
            }catch(error){
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }

        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }

    if(segmentos.length === 2 && segmentos[0] === "usuarios"){
        const id = Number(segmentos[1]);

        if(req.method === "GET"){
            const user = await us.buscarUsuarioPorId(id);
            return sendJson(res, user ? 200 : 404, user ?? { error: "Usuario no encontrado." }), true;
        }

        if(req.method === "PUT"){
            try{
                const body = await ReadBody(req);
                const user = JSON.parse(body);
                const resultado = await us.actualizarUsuario(id, user);
                return sendJson(res, 200, resultado), true;
            }catch(error){
                return sendJson(res, 400, { error: error instanceof Error ? error.message : "JSON inválido o campos incompletos." }), true;
            }
        }

        if(req.method === "DELETE"){
            const resultado = await us.eliminarUsuario(id);
            return sendJson(res, resultado ? 200 : 404, resultado ? { message: "Usuario eliminado." } : { error: "Usuario no encontrado." }), true;
        }        
        return sendJson(res, 405, { error: "Método no permitido" }), true;
    }
    return false;
}