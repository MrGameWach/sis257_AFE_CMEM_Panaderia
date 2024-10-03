import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column('decimal')
  total: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;
}
