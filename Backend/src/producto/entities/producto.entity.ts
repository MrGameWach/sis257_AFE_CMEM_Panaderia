import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length:50})
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column('varchar',{length:30})
  tipo: string;

  @Column('int')
  cantidad_disponible: number;

  @OneToMany(()=>Proveedor,(proveedor)=>proveedor.nombre)
  proveedores: Proveedor[];

  @ManyToOne(() => Pedido, (pedido) => pedido.productos)
  @JoinColumn({ name: 'id_pedido', referencedColumnName: 'id' })
  pedido: Pedido;
}
