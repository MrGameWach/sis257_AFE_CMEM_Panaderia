import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}
