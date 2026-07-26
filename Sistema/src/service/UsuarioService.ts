import { Usuario } from "../models/Usuario";



export class UsuarioService{
    usuarios : Usuario [] = [];

    mostrarUsuarios() : Usuario[]{
        return this.usuarios;
    }

    crearUsuario(usuario : Usuario) : Usuario{
        this.usuarios.push(usuario);
        return usuario
    }

    buscarUsuarioPorId(id : number) : Usuario | undefined{
        return this.usuarios.find(u => u.id_usuario === id);
    }

    actualizarUsuario(id : number, usuario : Usuario) : Usuario | null{
        const user = this.usuarios.find(u => u.id_usuario === id);

        if(!user){
            return null;
        }

        Object.assign(user, usuario);

        return usuario;
    }

    eliminarUsuario(id : number) : boolean{
        const indice = this.usuarios.findIndex(u => u.id_usuario === id);
        this.usuarios.splice(indice, 1);
        return true;
    }

}