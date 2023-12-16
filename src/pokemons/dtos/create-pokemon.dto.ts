import { IsNumber, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  img: string;

  @IsNumber()
  generation: number;
  @IsString()
  evolutionStage: string;

  @IsNumber()
  evolved: number;

  @IsNumber()
  familyId: number;

  @IsNumber()
  crossGen: number;
  @IsString()
  type1: string;

  @IsNumber()
  statTotal: number;

  @IsNumber()
  atk: number;

  @IsNumber()
  def: number;

  @IsNumber()
  sta: number;
}
