import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateKategoriDTO {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  slug?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsOptional()
  icon?: string;
}
