import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './pokemons.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
