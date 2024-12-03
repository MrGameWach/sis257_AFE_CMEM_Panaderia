import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsString, MaxLength } from "class-validator";


export class CreateInventarioDto {
    @ApiProperty()
    @IsNotEmpty({message:'el campo es obligatorio'})
    @IsString({message:'el campo es de tipo cadena'})
    @MaxLength(50,{message:'50 caracteres como maximo'})
    readonly nombre:string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'el campo no puede estar vacio' })
    @IsNumber()
    //@Min(0, { message: 'la cantidad no debe ser negativo' })
    readonly cantidad: number;

}
