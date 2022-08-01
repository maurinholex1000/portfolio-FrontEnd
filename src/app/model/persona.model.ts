export class persona{
    id?:number;
    nombre:string;
    apellido:string;
    titulo:string;
    despcripcion:string;
    portada:string;
    img: string;

    constructor(nombre:string,apellido:string, titulo:string,despcripcion:string,portada:string,img:string) {
        this.nombre=nombre;
        this.apellido=apellido;
        this.titulo=titulo;
        this.despcripcion=despcripcion;
        this.portada=portada;
        this.img=img;
            
    }
}