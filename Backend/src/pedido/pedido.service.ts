import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Producto } from 'src/producto/entities/producto.entity';
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
      empleado:{id:createPedidoDto.idEmpleado},
      cliente:{id:createPedidoDto.idCliente},
      producto:{id:createPedidoDto.idProducto},

    });
    if (existe) throw new ConflictException('el pedido ya existe')

    const pedido = new Pedido();
    pedido.fecha=createPedidoDto.fecha;
    pedido.total=createPedidoDto.total;
    pedido.cliente = { id: createPedidoDto.idCliente } as Cliente;
    pedido.empleado = { id: createPedidoDto.idEmpleado } as Empleado;
    pedido.producto = { id: createPedidoDto.idProducto } as Producto;

    return this.pedidosRepository.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidosRepository.find({
    relations: ['cliente', 'producto', 'empleado'],
    });
  }
  async findByEmpleado(idEmpleado: number): Promise<Pedido[]> {
    return this.pedidosRepository
      .createQueryBuilder('pedidos')
      .innerJoin('pedido.empleado', 'empleado')
      .where('empleado.id = :idEmpleado', { idEmpleado })
      .getMany();
  }
  async findByCliente(idCliente: number): Promise<Pedido[]> {
    return this.pedidosRepository
      .createQueryBuilder('pedidos')
      .innerJoin('pedido.cliente', 'cliente')
      .where('cliente.id = :idCliente', { idCliente })
      .getMany();
  }
  async findByProducto(idProducto: number): Promise<Pedido[]> {
    return this.pedidosRepository
      .createQueryBuilder('pedidos')
      .innerJoin('pedido.producto', 'producto')
      .where('producto.id = :idProducto', { idProducto })
      .getMany();
  }
  async findOne(id: number): Promise<Pedido> {
    const pedido = this.pedidosRepository.findOne({
      where: { id },
      relations: ['cliente','empleado','producto'],
    });
    if (!pedido) throw new NotFoundException('El pedido no existe');
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    pedido.total=updatePedidoDto.total;
    pedido.fecha=updatePedidoDto.fecha;
    pedido.empleado = { id: updatePedidoDto.idEmpleado } as Empleado;
    pedido.cliente={id:updatePedidoDto.idCliente}as Cliente;
    pedido.producto={id:updatePedidoDto.idProducto}as Producto;
    const pedidoUpdate = Object.assign(pedido, UpdatePedidoDto)
    return this.pedidosRepository.save(pedidoUpdate);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    return this.pedidosRepository.softRemove(pedido);
  }
}
