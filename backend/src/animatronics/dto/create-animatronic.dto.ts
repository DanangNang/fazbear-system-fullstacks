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

    @IsString({ message: 'Form harus berupa teks' })
    @MinLength(2, { message: 'Form / Klasifikasi minimal 2 karakter' })
    form: string;

    @IsString()
    @MinLength(4, { message: 'Series game minimal 4 karakter' })
    seriesGame: string;

    @IsInt({ message: 'Threat level harus berupa angka bulat' })
    @Min(1, { message: 'Threat level minimal 1' })
    @Max(10, { message: 'Threat level maksimal 10' })
    threatLevel: number;

    @IsBoolean({ message: 'Status isPossessed harus berupa boolean (true/false)' })
    isPossessed: boolean;

    @IsOptional()
    @IsString()
    @IsIn(['Possessed', 'Normal', 'Pasif'], {
        message: 'Status harus salah satu dari: Possessed, Normal, Pasif',
    })
    status?: string;

    @IsOptional()
    @IsString()
    behaviorNote?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}