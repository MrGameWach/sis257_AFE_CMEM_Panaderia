import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreatePedidoDto {
    @ApiProperty()
    @IsNotEmpty({message:'el campo no puede estar vacio'})
    readonly fecha:Date;
}
