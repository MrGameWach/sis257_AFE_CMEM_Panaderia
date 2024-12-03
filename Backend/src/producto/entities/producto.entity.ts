import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn,ManyToMany } from 'typeorm';

@Entity('productos')
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
  cantidadDisponible: number;


  @OneToMany(()=>Pedido,(pedido)=>pedido.producto)
  pedidos: Pedido[];
}
