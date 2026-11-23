import {
    IsBoolean,
    IsIn,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
    MinLength,
} from 'class-validator';

export class CreateAnimatronicDto {
    @IsString({ message: 'Nama animatronic harus berupa teks' })
    @MinLength(3, { message: 'Nama animatronic minimal 3 karakter' })
    name: string;

    @IsString()
    @IsIn(['Bear', 'Rabbit', 'Chicken', 'Fox', 'Things'], {
        message: 'Form harus salah satu dari: Bear, Rabbit, Chicken, Fox, Things',
    })
    form: string;

    @IsString()
    @MinLength(4, { message: 'Series game minimal 4 karakter (contoh: FNAF 1)' })
    seriesGame: string;

    @IsInt({ message: 'Threat level harus berupa angka bulat' })
    @Min(1, { message: 'Threat level minimal 1' })
    @Max(10, { message: 'Threat level maksimal 10' })
    threatLevel: number;

    @IsBoolean({ message: 'Status isPossessed harus berupa boolean (true/false)' })
    isPossessed: boolean;

    @IsOptional()
    @IsString()
    behaviorNote?: string;
}