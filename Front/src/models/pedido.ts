import type { Cliente } from "./cliente"
import type { Empleado } from "./empleado"
import type { Producto } from "./producto"
export interface Pedido{
    id:number
    idCliente:number
    idEmpleado:number
    idProducto: number
    fecha:Date
    total:number
    cliente:Cliente
    empleado:Empleado
    producto: Producto    
}