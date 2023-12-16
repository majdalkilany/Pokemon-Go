import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';
import { UpdatePokemonDto } from './dtos/update-pokemon.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonService: PokemonsService) {}

  @Post('seed')
  @UseGuards(AuthGuard)
  async seedData(): Promise<void> {
    await this.pokemonService.seedDataFromExcel();
  }

  @Post()
  @UseGuards(AuthGuard)
  createPokemon(@Body() body: CreatePokemonDto) {
    return this.pokemonService.create(body);
  }
  // Example==> pokemons/type/:type

  // type could be grass , fire, water ,bug.......

  @Get('/type/:type')
  async filterPokemonsByType(@Param('type') type: string) {
    const pokemons = await this.pokemonService.filterPokemonsByType(type);
    return pokemons;
  }

  // Example==> pokemons/search?name=Pikachu
  @Get('/search')
  async searchPokemonByName(@Query('name') name: string) {
    const pokemons = await this.pokemonService.searchPokemonByName(name);
    return pokemons;
  }

  // Example ==>  pokemons/page=1&pageSize=50
  @Get()
  async getAllPokemons(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 50,
  ) {
    const pokemons = await this.pokemonService.getAllPokemons(page, pageSize);
    return pokemons;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdatePokemonDto) {
    return this.pokemonService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.pokemonService.remove(parseInt(id));
  }
}
