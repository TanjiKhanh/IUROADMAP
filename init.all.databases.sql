-- Create all databases
CREATE DATABASE gupjob_auth;
CREATE DATABASE gupjob_admin;
CREATE DATABASE gupjob_mentor;
CREATE DATABASE gupjob_user;

-- Grant all privileges to gupjob user
GRANT ALL PRIVILEGES ON DATABASE gupjob_auth TO gupjob;
GRANT ALL PRIVILEGES ON DATABASE gupjob_admin TO gupjob;
GRANT ALL PRIVILEGES ON DATABASE gupjob_mentor TO gupjob;
GRANT ALL PRIVILEGES ON DATABASE gupjob_user TO gupjob;



