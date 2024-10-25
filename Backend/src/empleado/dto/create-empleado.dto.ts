import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, MaxLength, IsDefined, IsDateString } from "class-validator";

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

    @ApiProperty()
    @IsDefined({ message: 'La fecha de de contratacion debe estar definida' })
    @IsDateString({},{ message: 'La fecha de contratación debe ser una fecha válida' },)
    readonly fechaContratacion: Date;

}
