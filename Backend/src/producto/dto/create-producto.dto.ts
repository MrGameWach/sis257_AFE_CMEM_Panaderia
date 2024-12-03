import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsDefined, isNotEmpty, IsNotEmpty, isNumber, IsNumber, IsString, MaxLength, Min, validate } from "class-validator";

export class CreateProductoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsString({ message: 'el nombre debe ser de tipo cadena' })
    @MaxLength(50, { message: 'el campo no deve ser mayor a 50 caracteres' })
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsNumber()
    @Min(0, { message: 'el precio no debe ser negativo' })
    readonly precio: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsString({ message: 'el campo debe ser de tipo cadena' })
    @MaxLength(50, { message: 'maximo 50 caracteres' })
    readonly tipo: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsNumber()
    @Min(0, { message: 'el campo no debe ser negativo' })
    readonly cantidadDisponible: number;
}