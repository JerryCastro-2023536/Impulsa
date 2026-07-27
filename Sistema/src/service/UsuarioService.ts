import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService{
    ur = new UsuarioRepository();

    async mostrarUsuarios(){
        return await this.ur.selectUsuario();
    }

    async crearUsuario(usuario : Usuario){
        return await this.ur.insertUsuario(usuario);
    }

    async buscarUsuarioPorId(id : number) : Promise<Usuario | undefined>{
        return await this.ur.selectUsuarioPorId(id);
    }

    async actualizarUsuario(id : number, usuario : Usuario){
        return await this.ur.updateUsuario(id, usuario);
    }

    async eliminarUsuario(id : number){
        const existe = await this.ur.selectUsuarioPorId(id);

        if(!existe){
            return false;
        }

        await this.ur.deleteUsuario(id);

        return true;
    }

}