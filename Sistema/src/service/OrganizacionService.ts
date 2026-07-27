import { Organizacion } from "../models/Organizacion";
import { OrganizacionRepository } from "../repository/OrganizacionRepository";

export class OrganizacionService {
    or = new OrganizacionRepository();

    async mostrarOrganizaciones(): Promise<Organizacion[]> {
        return await this.or.selectOrganizacion();
    }

    async crearOrganizacion(organizacion: Organizacion): Promise<Organizacion> {
        return await this.or.insertOrganizacion(organizacion);
    }

    async buscarOrganizacionPorId(id: number): Promise<Organizacion | undefined> {
        return await this.or.selectOrganizacionPorId(id);
    }

    async actualizarOrganizacion(id: number, organizacion: Organizacion): Promise<Organizacion> {
        return await this.or.updateOrganizacion(id, organizacion);
    }

    async eliminarOrganizacion(id: number): Promise<boolean> {
        const existe = await this.or.selectOrganizacionPorId(id);
        if (!existe) {
            return false;
        }
        await this.or.deleteOrganizacion(id);
        return true;
    }

    async agregarOrganizacion(organizacion: Organizacion): Promise<Organizacion> {
        return await this.crearOrganizacion(organizacion);
    }

}
