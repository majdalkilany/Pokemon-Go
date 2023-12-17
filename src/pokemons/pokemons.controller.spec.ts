import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './pokemons.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

jest.mock('./pokemons.service');

describe('PokemonsController', () => {
  let controller: PokemonsController;
  let pokemonsService: PokemonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonsController],
      providers: [
        PokemonsService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<PokemonsController>(PokemonsController);
    pokemonsService = module.get<PokemonsService>(PokemonsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should seed data', async () => {
    const spy = jest.spyOn(pokemonsService, 'seedDataFromExcel');
    await controller.seedData();
    expect(spy).toHaveBeenCalled();
  });

  it('should create a Pokemon', async () => {
    const createPokemonDto = {
      name: 'string',
      img: 'string',
      generation: 3,
      evolutionStage: 'string',
      evolved: 1,
      familyId: 2,
      crossGen: 2,
      type1: 'string',
      statTotal: 1,
      atk: 2,
      def: 1,
      sta: 5,
    };

    const createdPokemon = {
      id: 1,
      ...createPokemonDto,
    };

    jest.spyOn(pokemonsService, 'create').mockResolvedValue(createdPokemon);

    const result = await controller.createPokemon(createdPokemon);
    expect(result).toBe(createdPokemon);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
