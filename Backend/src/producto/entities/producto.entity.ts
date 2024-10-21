import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
  cantidad_disponible: number;
}
