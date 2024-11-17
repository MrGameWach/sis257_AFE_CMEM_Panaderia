import type { Pedido } from "./pedido"
export interface Producto{
    id:number
    nombre:string
    precio: number
    tipo:string
    cantidadDisponible:number
    pedido:Pedido
}