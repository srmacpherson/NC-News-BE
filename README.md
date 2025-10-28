# NC News Seeding

## Hosted version:
https://nc-news-be-vwd3.onrender.com

## Author: 
Sam Macpherson (srmacpherson96@gmail.com)

## Summary:
'NC-News-BE' is a back-end project involving the creation of a PostgreSQL database and an ExpressJS RESTful server. The server allows for easy retrieval and manipulation of data from the database following REST and CRUD principles.

## Requirements:
Node.js v24.4.1
Postgres v17

## Getting Started:
To clone the repo:

*'git clone https://github.com/srmacpherson/NC-News-BE.git'*

To install dependencies:

*'npm install'*

To Seed Local Database:

*'npm run setup-dbs'* to create the test and development databases.

Create 2 new .env files:

*'.env.development', '.env.test'*

Inside of the relevant .env files, you must provide a reference to the appropriate database with *PGDATABASE=<'your-database'>*.

*'npm run test'* will run a test with 'jest' - Ensure this makes a console.log of the test database being connected.

*'npm run seed'* will seed the development database - Ensure this has a console.log of the development database being connected.

