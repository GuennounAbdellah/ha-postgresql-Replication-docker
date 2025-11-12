# High Availability PostgreSQL Replication Docker
This repository provides a Docker-based solution for setting up a high availability PostgreSQL replication environment. It includes configurations for both primary and secondary PostgreSQL servers.
## Features
- **Docker Compose**: Simplifies the setup and management of the PostgreSQL instances.
- **Primary PostgreSQL Server**: Configured to accept connections and handle write operations and send WAL (Write Ahead Log) files to the secondary server.
- **Secondary PostgreSQL Server**: Configured to replicate data from the primary server via WAL files.
- **Patroni for High Availability**: Agents that monitor PostgreSQL instances and handle failover and recovery.
- **Spilo (PostgreSQL + Patroni)**: Manages replication, automatic failover, and cluster state, you will find the Spilo image new available Tags from Zalando  in https://github.com/orgs/zalando/packages?repo_name=spilo
- **etcd for Service Discovery**: Provides distributed consensus and coordination for Patroni.
- **HAProxy**: Provides a single connection endpoint that automatically redirects traffic to the active PostgreSQL leader.
## Prerequisites
- Docker and Docker Compose installed on your machine.
## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/GuennounAbdellah/ha-postgresql-Replication-docker.git
2. Navigate to the project directory:
   ```bash
   cd ha-postgresql-Replication-docker
   ```
3. Start the Docker containers using Docker Compose:
   ```bash
   docker-compose up -d
   ```
4. Verify that the containers are running:
   ```bash
   docker-compose ps
   ```
## Accessing PostgreSQL
- Primary PostgreSQL Server:
   ```bash
   psql "postgresql://postgres:zalando@localhost:5000/postgres?sslmode=require"
   ```
   


