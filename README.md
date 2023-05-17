## Starting instructions

1. `nvm use`
2. `npm i`
3. `docker-compose up`

The commands start app container and postgres(but can be modified through ENV to connect to different host)

## API documentation
Documentation is written in swagger. After starting the project, it can be accessed at http://localhost:3001/api

## Seeder
To fill DB with randomly generated data:
1. start the service
2. run `npm run seed`

It will generate 10 projects, 50 tags, and for each project between 10-50 tasks

## What could be improved
- create DB migrations, instead of `synchronize:true` in typeorm module
- add Dockerfile, make docker image
- clean dependencies in `package.json` (most added on project init)