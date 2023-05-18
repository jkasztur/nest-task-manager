## Starting instructions

1. `nvm use`
2. `npm i`
3. `make up` or `docker-compose up`

The commands start app container and postgres(but can be modified through ENV to connect to different host)

## API documentation
Documentation is written in swagger. After starting the project, it can be accessed at http://localhost:3001/api

## Seeder
To fill DB with randomly generated data:
1. start the service
2. run `npm run seed`

It will generate 10 projects, 200 tags, and for each project between 10-50 tasks. To generate more, modify seeder script

## Task search
Searching is implemented on `POST /task/search` endpoint.
Searching can be done by multiple filters:
- id
- description
- createdAt
- updatedAt
- projectId, projectName
- tagId, tagName

For now, I implemented only `equals`, `lessThan`, `greaterThan` operations
Sorting is by task id, but possibly could be extended to createdAt and updatedAt params
The endpoint also supports pagination through `after` parameter. The value of `after` is task.id of last returned item from previous page.

## What could be improved
- create DB migrations, instead of `synchronize:true` in typeorm module
- add Dockerfile, make docker image
- clean dependencies in `package.json` (most added on project init)
- write more tests
- better error messages and http responses
 
## Tests
Tests use separate database, flushing before each test.
Cam be run with started service with `make test`
