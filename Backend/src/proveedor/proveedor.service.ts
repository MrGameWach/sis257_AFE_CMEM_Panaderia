import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedorsRepository:Repository<Proveedor>
  ){}
  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const existe = await this.proveedorsRepository.findOneBy({
      nombre: createProveedorDto.nombre.trim(),
      telefono:createProveedorDto.telefono.trim(),
      direccion:createProveedorDto.direccion.trim()
    });
    if (existe) throw new ConflictException('el proveedor ya existe')

    const proveedor = new Proveedor();
    proveedor.nombre=createProveedorDto.nombre.trim();
    proveedor.telefono=createProveedorDto.telefono.trim();
    proveedor.direccion=createProveedorDto.direccion.trim();
    return this.proveedorsRepository.save(proveedor);
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorsRepository.find();
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorsRepository.findOneBy({ id });
    if (!proveedor) throw new NotFoundException('el proveedor no existe');

    return proveedor;
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto): Promise<Proveedor> {
    const proveedor = await this.findOne(id);
    const proveedorUpdate = Object.assign(proveedor, UpdateProveedorDto)
    return this.proveedorsRepository.save(proveedorUpdate);
  }

  async remove(id: number) {
    const proveedor = await this.findOne(id);
    return this.proveedorsRepository.softRemove(proveedor);
  }
}
