import { Controller, Post } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonService: PokemonsService) {}

  @Post('seed')
  async seedData(): Promise<void> {
    await this.pokemonService.seedDataFromExcel();
  }
}
