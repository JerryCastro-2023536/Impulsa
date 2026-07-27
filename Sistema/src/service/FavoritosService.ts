import { Favoritos } from "../models/Favoritos";
import { FavoritosRepository } from "../repository/FavoritosRepository";

export class FavoritosService {
    fr = new FavoritosRepository();

    async mostrarFavoritos(): Promise<Favoritos[]> {
        return await this.fr.selectFavoritos();
    }

    async crearFavorito(favorito: Favoritos): Promise<Favoritos> {
        return await this.fr.insertFavorito(favorito);
    }

    async buscarFavoritoPorId(id: number): Promise<Favoritos | undefined> {
        return await this.fr.selectFavoritoPorId(id);
    }

    async actualizarFavorito(id: number, favorito: Favoritos): Promise<Favoritos> {
        return await this.fr.updateFavorito(id, favorito);
    }

    async eliminarFavorito(id: number): Promise<boolean> {
        const existe = await this.fr.selectFavoritoPorId(id);
        if (!existe) {
            return false;
        }
        await this.fr.deleteFavorito(id);
        return true;
    }

    async agregarFavorito(favorito: Favoritos): Promise<Favoritos> {
        return await this.crearFavorito(favorito);
    }

}
