import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import {Pedido} from 'src/pedido/entities/pedido.entity'

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>
  ) { }
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existe = await this.productosRepository.findOneBy({
      nombre: createProductoDto.nombre.trim(),
      precio: createProductoDto.precio,
      tipo: createProductoDto.tipo.trim(),
      cantidadDisponible: createProductoDto.cantidadDisponible,
    });
    if (existe) throw new ConflictException('el producto ya existe')

    const producto = new Producto();
    producto.nombre = createProductoDto.nombre.trim();
    producto.precio = createProductoDto.precio;
    producto.tipo = createProductoDto.tipo.trim();
    producto.cantidadDisponible = createProductoDto.cantidadDisponible;

    return this.productosRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productosRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOneBy({ id });
    if (!producto) throw new NotFoundException('el producto no existe');

    return producto;
  }
  async findByPedido(idPedido:number): Promise<Producto[]> {
    return this.productosRepository
      .createQueryBuilder('productos')
      .innerJoin('albumes.pedido','pedido')
      .where('pedido.id=idPedido',{idPedido})
      .getMany();
  }
  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    producto.nombre = updateProductoDto.nombre.trim();
    producto.precio = updateProductoDto.precio;
    producto.tipo = updateProductoDto.tipo.trim();
    producto.cantidadDisponible = updateProductoDto.cantidadDisponible;
    const productoUpdate = Object.assign(producto, UpdateProductoDto)
    return this.productosRepository.save(productoUpdate);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productosRepository.softRemove(producto);
  }
}
