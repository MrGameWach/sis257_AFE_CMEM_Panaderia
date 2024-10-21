import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length:50})
  nombre: string;

  @Column('varchar',{length:8})
  telefono: string;

  @Column('varchar',{length:30})
  direccion: string;
}
