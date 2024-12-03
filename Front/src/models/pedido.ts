import type { Cliente } from "./cliente"
import type { Empleado } from "./empleado"
import { Producto } from "./producto"
export interface Pedido{
    id:number
    fecha:Date
    total:number
    cliente:Cliente
    empleado:Empleado
    producto: Producto    
}