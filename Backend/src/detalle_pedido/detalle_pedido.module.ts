import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedidoService } from './detalle_pedido.service';
import { DetallePedidoController } from './detalle_pedido.controller';
import { DetallePedido } from './entities/detalle_pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido])], 
  providers: [DetallePedidoService],
  controllers: [DetallePedidoController],
})
export class DetallePedidoModule {}

