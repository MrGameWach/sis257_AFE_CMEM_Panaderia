import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidosRepository:Repository<Pedido>
  ){}
  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const existe = await this.pedidosRepository.findOneBy({
      fecha:createPedidoDto.fecha,
      total:createPedidoDto.total,
    });
    if (existe) throw new ConflictException('el pedido ya existe')

    const pedido = new Pedido();
    pedido.fecha=createPedidoDto.fecha;
    pedido.total=createPedidoDto.total;
    return this.pedidosRepository.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidosRepository.find();
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOneBy({ id });
    if (!pedido) throw new NotFoundException('el pedido no existe');

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    pedido.total=updatePedidoDto.total;
    pedido.fecha=updatePedidoDto.fecha;
    const pedidoUpdate = Object.assign(pedido, UpdatePedidoDto)
    return this.pedidosRepository.save(pedidoUpdate);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    return this.pedidosRepository.softRemove(pedido);
  }
}
