import type { Cliente } from "./cliente"
import type { Empleado } from "./empleado"
export interface Pedido{
    id:number
    fecha:Date
    total:number
    cliente:Cliente
    empleado:Empleado    
}