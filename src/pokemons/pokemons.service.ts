import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Pokemon } from './pokemons.entity';
import * as XLSX from 'xlsx';
import * as path from 'path';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.pokemonRepository.findOneBy({ id });
  }
  create(pokemonDto: CreatePokemonDto) {
    const pokemon = this.pokemonRepository.create(pokemonDto);
    return this.pokemonRepository.save(pokemon);
  }

  async filterPokemonsByType(type: string): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      where: {
        type1: type,
      },
    });
  }

  async getAllPokemons(page = 1, pageSize = 50): Promise<Pokemon[]> {
    const skip = (page - 1) * pageSize;

    return this.pokemonRepository.find({
      skip,
      take: pageSize,
    });
  }

  async searchPokemonByName(name: string): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  async update(id: number, attrs: Partial<Pokemon>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.pokemonRepository.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.pokemonRepository.remove(user);
  }

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
