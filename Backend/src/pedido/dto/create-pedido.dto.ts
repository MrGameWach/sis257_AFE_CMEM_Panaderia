import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty, IsNumber, Min, IsDefined, IsArray, ArrayNotEmpty, } from "class-validator";

export class CreatePedidoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  readonly fecha: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'el campo no puede estar vacio' })
  @IsNumber({}, { message: 'el campo debe ser numerico' })
  @Min(0, { message: 'la cantidad no debe ser negativo' })
  readonly total: number;

  @ApiProperty({ description: 'ID del cliente asociado' })
  @IsDefined({ message: 'El campo idCliente debe estar definido' })
  @IsNumber({}, { message: 'El campo idCliente debe ser numérico' })
  readonly idCliente: number;

  @ApiProperty({ description: 'ID del empleado asociado' })
  @IsDefined({ message: 'El campo idEmpleado debe estar definido' })
  @IsNumber({}, { message: 'El campo idEmpleado debe ser numérico' })
  readonly idEmpleado: number;

  @ApiProperty({ description: 'ID del producto asociado' })
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsNumber({}, { message: 'El campo idProducto debe ser numérico' })
  readonly idProducto: number;

}
