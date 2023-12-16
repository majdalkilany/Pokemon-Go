import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdatePokemonDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  img: string;
  @IsOptional()
  @IsNumber()
  generation: number;
  @IsOptional()
  @IsString()
  evolutionStage: string;
  @IsOptional()
  @IsNumber()
  evolved: number;
  @IsOptional()
  @IsNumber()
  familyId: number;
  @IsOptional()
  @IsNumber()
  crossGen: number;
  @IsOptional()
  @IsString()
  type1: string;

  @IsNumber()
  statTotal: number;

  @IsNumber()
  atk: number;
  @IsOptional()
  @IsNumber()
  def: number;
  @IsOptional()
  @IsNumber()
  sta: number;
}
