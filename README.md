## Starting instructions

1. `nvm use`
2. `npm i`
3. `docker-compose up`

The commands start app container and postgres(but can be modified through ENV to connect to different host)

## API documentation
Documentation is written in swagger. After starting the project, it can be accessed at http://localhost:3001/api

## What could be improved
- create DB migrations, instead of `synchronize:true` in typeorm module
- add Dockerfile, make docker image
- clean dependencies in `package.json` (most added on project init)