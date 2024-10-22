import { Producto } from 'src/producto/entities/producto.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length:50})
  nombre: string;

  @Column('varchar',{length:8})
  telefono: string;

  @Column('varchar',{length:30})
  direccion: string;

  @ManyToOne(() => Producto, (producto) => producto.proveedores)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}
