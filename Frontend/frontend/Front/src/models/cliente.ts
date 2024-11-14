import type { Pedido } from "./pedido"
export interface Cliente{
    id:number
    nombre:string
    email:string
    telefono:string
    pedido:Pedido
}