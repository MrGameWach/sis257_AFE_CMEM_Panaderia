import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  rol: string;

  @Column()
  fechaContratacion: Date;

  @OneToMany(()=>Pedido,(pedido)=>pedido.total)
  pedidos: Pedido[];
}
