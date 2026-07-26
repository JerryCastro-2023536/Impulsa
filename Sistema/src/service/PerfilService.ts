import { Perfil } from "../models/Perfil";

let perfiles: Perfil[] = [];

export class PerfilService {

    mostrarPerfiles(): Perfil[] {
        return perfiles;
    }

    agregarPerfil(perfil: Perfil): Perfil {
        perfiles.push(perfil);
        return perfil;
    }

    buscarPerfilPorId(id: number): Perfil | undefined {
        return perfiles.find(p => p.id_perfil === id);
    }

    actualizarPerfil(id: number, perfil: Perfil): Perfil | null {
        const dato = perfiles.find(p => p.id_perfil === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, perfil);
        return dato;
    }

    eliminarPerfil(id: number): boolean {
        const indice = perfiles.findIndex(p => p.id_perfil === id);
        if (indice !== -1) {
            perfiles.splice(indice, 1);
            return true;
        }
        return false;
    }

}
