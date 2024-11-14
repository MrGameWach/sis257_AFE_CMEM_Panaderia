import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>
  ) { }
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const existe = await this.clientesRepository.findOneBy({
      nombre: createClienteDto.nombre.trim(),
      email:createClienteDto.email.trim(),
      telefono:createClienteDto.telefono.trim()
    });
    if (existe) throw new ConflictException('el cliente ya existe')

    const cliente = new Cliente();
    cliente.nombre = createClienteDto.nombre.trim();
    cliente.email=createClienteDto.email.trim();
    cliente.telefono=createClienteDto.telefono.trim();
    return this.clientesRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ id });
    if (!cliente) throw new NotFoundException('el cliente no existe');

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    cliente.email=updateClienteDto.email.trim();
    cliente.nombre=updateClienteDto.nombre.trim();
    cliente.telefono=updateClienteDto.telefono.trim();
    const clienteUpdate = Object.assign(cliente, UpdateClienteDto)
    return this.clientesRepository.save(clienteUpdate);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    return this.clientesRepository.softRemove(cliente);
  }
}