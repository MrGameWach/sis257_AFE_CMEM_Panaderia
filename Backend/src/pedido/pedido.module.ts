import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Pedido])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
