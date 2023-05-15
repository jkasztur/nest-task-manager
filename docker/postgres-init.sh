#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE tasks_manager_test;
    CREATE USER tasks_manager_test WITH PASSWORD 'tasks_manager_test';
    GRANT ALL PRIVILEGES ON DATABASE tasks_manager_test TO tasks_manager_test;
EOSQL
