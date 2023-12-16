import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonsModule } from './pokemons/pokemons.module';
// import { Pokemon } from './pokemons/pokemons.entity';
import { UsersModule } from './users/users.module';
// import { User } from './users/Users.entity';
// import { config } from 'process';
@Module({
  imports: [
    PokemonsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [Pokemon, User],
    //   synchronize: true,
    // }),

    // for postgres
    // TypeOrmModule
    // .forRoot
    //   {
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'majd',
    //   password: '1234',
    //   database: 'Pokemons',
    // synchronize: true,
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // }
    // (),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
