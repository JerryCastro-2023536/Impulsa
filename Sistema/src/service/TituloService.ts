import { Titulo } from "../models/Titulo";

let titulos : Titulo [] = [];

export class TituloService{
    

    mostrarTitulos() : Titulo[]{
        return titulos;
    }

    agregarTitulo(titulo : Titulo) : Titulo{
        titulos.push(titulo);
        return titulo;
    }

    buscarTituloPorId(id : number) : Titulo | undefined{
        return titulos.find(u => u.id_titulo === id);
    }

    actualizarTitulo(id : number, titulo : Titulo) : Titulo | null{
        const dato = titulos.find(u => u.id_titulo === id);
        if(!dato){
            return null;
        }
        Object.assign(dato, titulo);

        return titulo;

    }

    eliminarTitulo(id : number) : boolean{
        const indice = titulos.findIndex(u => u.id_titulo === id);
        titulos.splice(indice, 1);
        return true;
    }


}