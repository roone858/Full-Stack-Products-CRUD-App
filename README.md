# CRUD 

- [CRUD](#crud)
  - [Description](#description)
  - [Getting Started](#getting-started)
  - [Create Databases](#create-databases)
  - [Project Setup](#project-setup)
  - [Environment Variables](#environment-variables)
  - [Running Ports](#running-ports)
  - [Built With](#built-with)

---

## Description


create Full Stack application using Node.js and PostgresSQL and pure Html,css,JavaScript

build RESTful APIs with Express and PostgresSQL

 how to use `fetch` to Consume API

 Store Data in LocalStorage to reduce the number of database queries needed on the server. 

 develop and Basic CRUD application with all Create, Read, Update and Delete Functionality


So, Let's learn together with fun

## Getting Started

1. Clone this repo locally into the location of your choice.
2. Open a terminal and navigate to the root of the repo
3. follow the instructions in the Project Setup

The project can run but is missing some information to connect to the database and storage service.
## Create Databases
- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER shopping_user WITH PASSWORD 'password123';`
- In psql run the following to create the  database
    - `CREATE DATABASE crud;`
    
- Connect to the databases and grant all privileges
    - `\c crud`
- run the following to create the Product table 
  
    ```
    CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    price float NOT NULL,
    taxes float NOT NULL,
    ads float NOT NULL,
    discount float NOT NULL,
    total float NOT NULL,
    count int NOT NULL,
    category VARCHAR(250) NOT NULL);
    ```

    
## Project Setup

1. Clone the project - `https://github.com/roone858/Full-Stack-Products-CRUD-App.git`
2. Open  the Frontend  with Local live Server 
3. Open new terminal - `cd ./api`
4. Setup variables in the .env file `.env`
5. Install the dependencies - `npm install`
6. start the backend - `npm run start`

## Environment Variables

Setup the following variables in the .env file environments:
```

- HOST       = localhost
- PORT       = 5432
- DATABASE   = crud
- USERNAME   = postgres
- PASSWORD   = your password
```
## Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`
## Built With
 - [PostgreSQL](https://www.postgresql.org/) -  Database System
- HTML ,CSS ,JavaScript  - Pure Frontend Single Page Application
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework

# Full-Stack-Products-CRUD-App-
