import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateInventarioDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsNumber()
    @Min(0, { message: 'la cantidad no debe ser negativo' })
    readonly cantidad: number;
}
