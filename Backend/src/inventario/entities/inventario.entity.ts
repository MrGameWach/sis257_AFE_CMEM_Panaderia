import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cantidad: number;

  @Column()
  fecha_actualizacion: Date;
}
