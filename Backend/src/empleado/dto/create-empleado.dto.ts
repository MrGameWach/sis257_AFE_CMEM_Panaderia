import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateEmpleadoDto {
    @ApiProperty()
    @IsNotEmpty({message:'el campo es obligatorio'})
    @IsString({message:'el campo es de tipo cadena'})
    @MaxLength(50,{message:'50 caracteres como maximo'})
    readonly nombre:string;

    @ApiProperty()
    @IsNotEmpty({message:'el campo es obligatorio'})
    @IsString({message:'el campo es de tipo cadena'})
    @MaxLength(30,{message:'50 caracteres como maximo'})
    readonly rol:string;
}
