#!/bin/bash
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE USER graphql WITH SUPERUSER PASSWORD 'graphql';
	CREATE DATABASE graphql_development OWNER graphql;
	CREATE DATABASE graphql_test OWNER graphql;
	CREATE DATABASE graphql_production OWNER graphql;
EOSQL
