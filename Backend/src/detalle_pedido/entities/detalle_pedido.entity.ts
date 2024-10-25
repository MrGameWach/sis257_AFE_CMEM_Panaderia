import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('detalle-pedidos')
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cantidad: number;

  @Column('decimal')
  subtotal: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;
}

