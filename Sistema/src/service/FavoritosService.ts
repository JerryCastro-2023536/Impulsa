import { Favoritos } from "../models/Favoritos";

let favoritos: Favoritos[] = [];

export class FavoritosService {

    mostrarFavoritos(): Favoritos[] {
        return favoritos;
    }

    agregarFavorito(favorito: Favoritos): Favoritos {
        favoritos.push(favorito);
        return favorito;
    }

    buscarFavoritoPorId(id: number): Favoritos | undefined {
        return favoritos.find(f => f.id_favorito === id);
    }

    actualizarFavorito(id: number, favorito: Favoritos): Favoritos | null {
        const dato = favoritos.find(f => f.id_favorito === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, favorito);
        return dato;
    }

    eliminarFavorito(id: number): boolean {
        const indice = favoritos.findIndex(f => f.id_favorito === id);
        if (indice !== -1) {
            favoritos.splice(indice, 1);
            return true;
        }
        return false;
    }

}
