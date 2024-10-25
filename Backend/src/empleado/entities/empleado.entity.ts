import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  rol: string;

  @Column('date',{name:'fecha_contratacion'})
  fechaContratacion: Date;

  @OneToMany(()=>Pedido,(pedido)=>pedido.total)
  pedidos: Pedido[];
}
