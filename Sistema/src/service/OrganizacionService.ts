import { Organizacion } from "../models/Organizacion";

let organizaciones: Organizacion[] = [];

export class OrganizacionService {

    mostrarOrganizaciones(): Organizacion[] {
        return organizaciones;
    }

    agregarOrganizacion(organizacion: Organizacion): Organizacion {
        organizaciones.push(organizacion);
        return organizacion;
    }

    buscarOrganizacionPorId(id: number): Organizacion | undefined {
        return organizaciones.find(o => o.id_organizacion === id);
    }

    actualizarOrganizacion(id: number, organizacion: Organizacion): Organizacion | null {
        const dato = organizaciones.find(o => o.id_organizacion === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, organizacion);
        return dato;
    }

    eliminarOrganizacion(id: number): boolean {
        const indice = organizaciones.findIndex(o => o.id_organizacion === id);
        if (indice !== -1) {
            organizaciones.splice(indice, 1);
            return true;
        }
        return false;
    }

}
