import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
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

