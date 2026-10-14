#!/bin/sh
# Runs once, when PostgreSQL initialises an empty data volume (docker-entrypoint-initdb.d).
# One role + one database per service; a service can only reach its own database.
# Names must match terraform/modules/app-environment/main.tf (locals.databases).
set -e

create_service_db() {
  db="$1"
  role="$2"
  password="$3"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres <<EOSQL
CREATE ROLE "$role" LOGIN PASSWORD '$password';
CREATE DATABASE "$db" OWNER "$role";
REVOKE ALL ON DATABASE "$db" FROM PUBLIC;
EOSQL
  echo "created database $db (owner $role)"
}

create_service_db iuroadmap_auth auth_svc "$AUTH_DB_PASSWORD"
create_service_db iuroadmap_roadmap roadmap_svc "$ROADMAP_DB_PASSWORD"
create_service_db iuroadmap_mentor mentor_svc "$MENTOR_DB_PASSWORD"
create_service_db iuroadmap_user user_svc "$USER_DB_PASSWORD"
