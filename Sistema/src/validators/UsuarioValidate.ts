import { Estado } from "../enums/Estado";
import { RolUser } from "../enums/RolUser";
import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export async function UsuarioValidate(usuario : Usuario){
    const errores : string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const ur = new UsuarioRepository();

    if(usuario.nombre === null || String(usuario.nombre).trim() === ""){
        errores.push("nombre vacio");
    }

    if(usuario.apellido === null || String(usuario.apellido).trim() === ""){
        errores.push("apellido vacio");
    }

    if(usuario.username === null || String(usuario.username).trim() === ""){
        errores.push("username vacio");
    }

    if(usuario.correo === null || String(usuario.correo).trim() === ""){
        errores.push("correo vacio");
    }

    if(usuario.password === null || String(usuario.password).trim() === ""){
        errores.push("password vacio");
    }

    if(usuario.telefono === null || usuario.telefono < 0){
        errores.push("telfono vacio o incorrecto");
    }

    if(usuario.rol === null || String(usuario.rol).trim() === ""){
        errores.push("rol vacio");
    }

    if(usuario.estado === null || String(usuario.estado).trim() === ""){
        errores.push("estado vacio");
    }

    if(usuario.fecha_registro === null || String(usuario.fecha_registro).trim() === ""){
        errores.push("fecha vacio");
    }

    if(await ur.existeUsername(usuario.username)){
        errores.push("El usuario ya existe");
    }

    if(await ur.existeCorreo(usuario.correo)){
        errores.push("El correo ya existe");
    }

    if(!Object.values(Estado).includes(usuario.estado)){
        errores.push("Estado inválido.");
    }

    if(!Object.values(RolUser).includes(usuario.rol)){
        errores.push("Rol inválido.");
    }

    if(!emailRegex.test(usuario.correo)){
        errores.push("Correo electrónico inválido.");
    }

    if(isNaN(new Date(usuario.fecha_registro).getTime())){
        errores.push("Fecha inválida.");
    }

    return errores;
}