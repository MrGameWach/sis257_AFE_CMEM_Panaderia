import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private inventariosRepository:Repository<Inventario>
  ){}
  async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
    const existe = await this.inventariosRepository.findOneBy({
      nombre: createInventarioDto.nombre,
      cantidad:createInventarioDto.cantidad
    });
    if (existe) throw new ConflictException('el inventario ya existe')

    const inventario = new Inventario();
    inventario.cantidad=createInventarioDto.cantidad;
    inventario.nombre=createInventarioDto.nombre;
    
    return this.inventariosRepository.save(inventario);
  }

  async findAll(): Promise<Inventario[]> {
    return this.inventariosRepository.find();
  }

  async findOne(id: number): Promise<Inventario> {
    const inventario = await this.inventariosRepository.findOneBy({ id });
    if (!inventario) throw new NotFoundException('el inventario no existe');

    return inventario;
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto): Promise<Inventario> {
    const inventario = await this.findOne(id);
    inventario.cantidad=updateInventarioDto.cantidad;
    inventario.nombre=updateInventarioDto.nombre.trim();
    const inventarioUpdate = Object.assign(inventario, UpdateInventarioDto)
    return this.inventariosRepository.save(inventarioUpdate);
  }

  async remove(id: number) {
    const inventario = await this.findOne(id);
    return this.inventariosRepository.softRemove(inventario);
  }
}
