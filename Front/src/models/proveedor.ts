import type { Producto } from "./producto"

export interface Proveedor{
    id:number
    nombre:string
    telefono:string
    direccion:string
    producto:Producto
}