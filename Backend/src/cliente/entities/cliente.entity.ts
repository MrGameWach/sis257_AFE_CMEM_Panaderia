import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length:50})
  nombre: string;

  @Column('varchar',{length:30})
  email: string;

  @Column('varchar',{length:8})
  telefono: string;

  @OneToMany(()=>Pedido,(pedido)=>pedido.total)
  pedidos:Pedido;

}
