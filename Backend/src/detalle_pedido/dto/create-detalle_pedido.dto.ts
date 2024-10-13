import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateDetallePedidoDto {
    @ApiProperty()
    @IsNotEmpty({message:'este campo es obligatorio'})
    @IsNumber()
    @Min(0,{message:'el campo no puede ser negativo'})
    readonly cantidad:number;

    @ApiProperty()
    @IsNotEmpty({message:'este campo es obligatorio'})
    @IsNumber()
    readonly subtotal:number;
}
