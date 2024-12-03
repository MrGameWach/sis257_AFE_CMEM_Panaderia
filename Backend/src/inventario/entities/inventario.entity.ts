import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('int')
  cantidad: number;

  @UpdateDateColumn({ type: 'timestamp' })
  fechaActualizacion: Date;
}