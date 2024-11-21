import type { Pedido } from "./pedido"
export interface Empleado{
    id:number
    nombre:string
    rol:string
    fechaContratacion:Date
    pedido:Pedido
}