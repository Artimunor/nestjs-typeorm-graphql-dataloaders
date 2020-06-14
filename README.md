# nestjs-typeorm-graphql-dataloaders
[Nest](https://github.com/nestjs/nest) framework TypeScript with [TypeORM](https://github.com/typeorm/typeorm), [GraphQL](https://github.com/graphql/graphql-js) and [DataLoaders](https://github.com/graphql/dataloader).

## Installation
```bash
$ npm install
```

## Running the app
1. Create a MySQL database.
2. You need to put your environment variables.
   - Create a new file named `local.env` inside the folder `env`.
   - Put the environment variables (if you have doubts about what variables you need, take a look `env/example.env`).
3. Open the file `scr/shared/modules/type-orm/type-orm.module.ts` and set the `synchronize` value to `true` to allow TypeORM to create all the entities in your database, once they have been created set the `synchronize` value to `false`.
4. Run the seed.
   - Open the file `src/shared/seeds/seed.sql` and run it in your database.
5. `$ npm run start`.
