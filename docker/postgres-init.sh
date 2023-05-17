#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE task_manager_test;
    CREATE USER task_manager_test WITH PASSWORD 'task_manager_test';
    GRANT ALL PRIVILEGES ON DATABASE task_manager_test TO task_manager_test;
EOSQL
