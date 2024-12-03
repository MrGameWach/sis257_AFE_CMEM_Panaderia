import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, isDefined, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsString, MaxLength } from "class-validator";

export class CreateClienteDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsString({ message: 'el campo es de tipo cadena' })
    @MaxLength(50, { message: '50 caracters como maximo' })
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsString({ message: 'el campo es de tipo cadena' })
    @MaxLength(30, { message: '50 caracters como maximo' })
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsString({ message: 'el campo es de tipo cadena' })
    @MaxLength(8, { message: '8 caracters como maximo' })
    readonly telefono: string;

}
