# graphql_experiments
Just a playground for experimenting with GraphQL and various frameworks.

## Files central for the development of a CRUD model

* Server: index.js
* Functions, expected to be in a CRUD model, independent of the backend storage (SQL, Document-Based, Key-Value-Store...): crud.js
* Definition of how to use Sequelize with a Model: db.js

## Start this Sandbox

You need Docker to play around with this and have a Postgres Database automatically included (i.e. Docker will take care the Postgres DB)

To start the server, use `docker-compose -f docker-compose.yml up --build`

To start PostgraqhQL (see Github https://github.com/postgraphql/postgraphql) use the above but with file `docker-compose-postgraphql.yml`

To start PSQL to explore the database use the above but with file `docker-compose-psql.yml`

To start an interactive NodeJS shell issue `docker-compose -f ./docker-compose.yml run -v '/home/hallab/projects/graphql_experiments:/usr/src/app' graphql_app node` (Note, that you have to replace `/home/hallab/projects/graphql_experiments` with your current path).
