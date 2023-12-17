# Pokemon Go Data Management Application

## Getting Started

This repository contains an application that manages Pokemon Go data, built with NestJS and TypeORM.

### Built With

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/)

## Setup

1. Clone this repository:

   ```bash
   git clone git@github.com:majdalkilany/Vet-clinic-database.git
   ```

2. Run Docker Compose:

   ```bash
   docker-compose up
   ```

### Seed Data

- Pokemon data will be automatically seeded when the server runs.

### Create Admin User

To perform actions such as adding, deleting, and editing Pokemon, create an admin user using the following endpoint:

- Endpoint: `http://localhost:8080/auth/signup`
- Method: `POST`
- Body:

  ```json
  {
    "email": "admin@admin.com",
    "password": "1234",
    "admin": true
  }
  ```

## Tests

The tested features include:

- `src/users/users.service.spec.ts`
- `src/users/auth.service.spec.ts`
- `src/users/users.controller.spec.ts`
- `src/app.controller.spec.ts`
- `src/pokemons/pokemons.controller.spec.ts`

## Endpoints

- User Endpoints: [Documentation](https://documenter.getpostman.com/view/12045116/2s9Ykn92dy)
- Pokemon Endpoints: [Documentation](https://documenter.getpostman.com/view/12045116/2s9Ykn92dv)
