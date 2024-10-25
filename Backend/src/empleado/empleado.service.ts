import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadosRepository:Repository<Empleado>
  ){}
  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const existe = await this.empleadosRepository.findOneBy({
      nombre: createEmpleadoDto.nombre.trim(),
      rol:createEmpleadoDto.rol.trim()
    });
    if (existe) throw new ConflictException('el empleado ya existe')

    const empleado = new Empleado();
    empleado.nombre = createEmpleadoDto.nombre.trim();
    empleado.rol=createEmpleadoDto.rol.trim();
    empleado.fechaContratacion=createEmpleadoDto.fechaContratacion;
    return this.empleadosRepository.save(empleado);
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadosRepository.find();
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadosRepository.findOneBy({ id });
    if (!empleado) throw new NotFoundException('el empleado no existe');

    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado = await this.findOne(id);
    empleado.nombre=updateEmpleadoDto.nombre.trim();
    empleado.rol=updateEmpleadoDto.rol.trim();
    empleado.fechaContratacion=updateEmpleadoDto.fechaContratacion;
    const empleadoUpdate = Object.assign(empleado, UpdateEmpleadoDto)
    return this.empleadosRepository.save(empleadoUpdate);
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    return this.empleadosRepository.softRemove(empleado);
  }
}
