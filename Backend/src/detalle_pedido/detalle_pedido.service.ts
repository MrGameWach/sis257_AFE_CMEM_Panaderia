import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle_pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle_pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from './entities/detalle_pedido.entity';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private detallePedidosRepository:Repository<DetallePedido>
  ){}
  async create(createDetallePedidoDto: CreateDetallePedidoDto):Promise<DetallePedido> {
    const existe = await this.detallePedidosRepository.findOneBy({
      cantidad:createDetallePedidoDto.cantidad,
      subtotal:createDetallePedidoDto.subtotal
    });
    if (existe) throw new ConflictException('el detalle del pedido ya existe')

    const detallePedido = new DetallePedido();
    detallePedido.cantidad=createDetallePedidoDto.cantidad;
    detallePedido.subtotal=createDetallePedidoDto.subtotal;
    
    return this.detallePedidosRepository.save(detallePedido);
  }

  async findAll():Promise<DetallePedido[]> {
    return this.detallePedidosRepository.find();
  }

  async findOne(id: number):Promise<DetallePedido> {
    const detallePedido = await this.detallePedidosRepository.findOneBy({ id });
    if (!detallePedido) throw new NotFoundException('el pedido no existe');

    return detallePedido;
  }

  async update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto):Promise<DetallePedido> {
    const detallePedido = await this.findOne(id);
    const detallePedidoUpdate = Object.assign(detallePedido, UpdateDetallePedidoDto)
    return this.detallePedidosRepository.save(detallePedidoUpdate);  }

  async remove(id: number) {
    const detallePedido = await this.findOne(id);
    return this.detallePedidosRepository.softRemove(detallePedido);
  }
}
