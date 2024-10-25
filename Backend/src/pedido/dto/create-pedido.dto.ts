import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty,IsNumber,Min } from "class-validator";

export class CreatePedidoDto {
    @ApiProperty()
    @IsNotEmpty({message:'el campo no puede estar vacio'})
    readonly fecha:Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsNumber({},{message:'el campo debe ser numerico'})
    @Min(0, { message: 'la cantidad no debe ser negativo' })
    readonly total: number;
}
