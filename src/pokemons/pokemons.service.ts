import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemons.entity';
import * as XLSX from 'xlsx';
import * as path from 'path';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async seedDataFromExcel(): Promise<void> {
    const projectRoot = process.cwd();
    const filePath = path.join(projectRoot, 'Pokemon Go.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    const entitiesToSave = data.map((row: any) => {
      const pokemon = new Pokemon();
      pokemon.name = row.Name;
      pokemon.img = row['Img name'];
      pokemon.generation = row.Generation;
      pokemon.evolutionStage = row['Evolution Stage'];
      pokemon.evolved = row.Evolved;
      pokemon.familyId = row.FamilyID;
      pokemon.crossGen = row['Cross Gen'];
      pokemon.type1 = row['Type 1'];
      pokemon.statTotal = row['STAT TOTAL'];
      pokemon.atk = row.ATK;
      pokemon.def = row.DEF;
      pokemon.sta = row.STA;
      return pokemon;
    });

    await this.pokemonRepository.save(entitiesToSave);
  }
}
