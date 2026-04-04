\set ON_ERROR_STOP on

SELECT 'CREATE DATABASE gupjob_auth'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'gupjob_auth')\gexec

SELECT 'CREATE DATABASE gupjob_admin'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'gupjob_admin')\gexec

SELECT 'CREATE DATABASE gupjob_mentor'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'gupjob_mentor')\gexec

SELECT 'CREATE DATABASE gupjob_user'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'gupjob_user')\gexec

GRANT ALL PRIVILEGES ON DATABASE gupjob_auth TO gupjob;
GRANT ALL PRIVILEGES ON DATABASE gupjob_admin TO gupjob;
GRANT ALL PRIVILEGES ON DATABASE gupjob_mentor TO gupjob;
GRANT ALL PRIVILEGES ON DATABASE gupjob_user TO gupjob;
