import { IsString, IsNumber, IsBoolean, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class CatDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    @Max(30)
    age: number;

    @IsString()
    breed: string;

    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    isVaccinated: boolean;

    @IsString()
    color: string;
}
