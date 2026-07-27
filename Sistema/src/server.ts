import * as http from "http";
import { UsuarioRouter } from "./api/UsuarioRouter";
import { TituloRouter } from "./api/TituloRouter";
import { DocumentoRouter } from "./api/DocumentoRouter";
import { ExperienciaRouter } from "./api/ExperienciaRouter";
import { PerfilRouter } from "./api/PerfilRouter";
import { OrganizacionRouter } from "./api/OrganizacionRouter";
import { PostulacionRouter } from "./api/PostulacionRouter";
import { RecomendacionRouter } from "./api/RecomendacionRouter";
import { FavoritoRouter } from "./api/FavoritosRouter";
import { FeedbackRouter } from "./api/FeedbackRouter";
import { OportunidadRouter } from "./api/OportunidadRouter";
import { HabilidadRouter } from "./api/HabilidadRouter";
import { HistorialRouter } from "./api/HistorialRouter";
import { NotificacionRouter } from "./api/NotificacionRouter";
import * as dotev from "dotenv";
import { testConexion } from "./db/Conexion";

dotev.config();

const port = process.env.PORT

const server = http.createServer(async (req, res) => {
    const handled =
        await UsuarioRouter(req, res) ||
        await TituloRouter(req, res) ||
        await DocumentoRouter(req, res) ||
        await ExperienciaRouter(req, res) ||
        await PerfilRouter(req, res) ||
        await OrganizacionRouter(req, res) ||
        await PostulacionRouter(req, res) ||
        await RecomendacionRouter(req, res) ||
        await FavoritoRouter(req, res) ||
        await FeedbackRouter(req, res) ||
        await OportunidadRouter(req, res) ||
        await HabilidadRouter(req, res) ||
        await HistorialRouter(req, res) ||
        await NotificacionRouter(req, res);

    if (!handled) {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify({ error: "Ruta no encontrada." }));
    }
});


async function start(){

    await testConexion();

    server.listen(port, () =>{
    console.log("------------------------------------------");
    console.log("Servidor iniciado en http://localhost:" + port);
    console.log("------------------------------------------");
    });
}


start();