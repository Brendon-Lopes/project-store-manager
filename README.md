# Select Language: English, [Português](./README-PT.md).

# Project Store Manager

A project made to practice the creation of RESTful APIs, using the MSC (Model, Service, Controller) architecture. Using the mysql2 library.

The API is a CRUD of sales management in the dropshipping format.

The unit tests were made using the Mocha, Chai and Sinon libraries, and have 100% coverage over the MSC layers.

<hr></hr>

## 🛠 Tools / Skills

Node.js, MySQL, MSC Architecture, JOI, Mocha, Chai, Sinon...

<hr></hr>

## Environment Variables

To run this project you'll need to add environment variables in your `.env` file.

An example is available in the `.env.example` file. You only need to rename it to `.env` and change the variables values if necessary.

<hr></hr>

## Usage

- To clone this project: `git clone git@github.com:Brendon-Lopes/project-store-manager.git`.

- There is a `docker-compose.yml` file (Made available by trybe). You'll only need to run the command `docker-compose up` to run MySQL and Node with docker.

- The files to create the tables and seed them can be found in `migration.sql` and `seed.sql` respectively. And can be used in a database manager (e.g., DBeaver, MySQL Workbench...).

- `npm start` to run the application using node.

- `npm test` to test the application.

- You can use a platform to request from the API's endpoints (e.g., Postman, Insomnia, Thunder Client...).

<hr></hr>

## Diagrams

![Tables relationships diagram](diagramas-store-manager.png)

<i> Image made available by Trybe </i>

<hr></hr>

## Endpoints

- GET `/products` to list all products.
- GET `/products/:id` to list a product by id.
- POST `/products/:id` to register a new product. (Must receive the property `name` inside the body).
- POST `/sales` to register new sales. (Must receive an array of objects, containing the properties `productId` and `quantity`).
- GET `/sales` to list all sales.
- GET `/sales/:id` to list sales by id.
- PUT `/products/:id` to update a product's name by id. (Must receive the property `name`).
- DELETE `/products/:id` to delete a product that contains the id passed by URL parameter.
- DELETE `/sales/:id` to delete a sale by id.
- PUT `/sales/:id` to update a sale by id. (Must receive an array of objects containing `productId` and `quantity` inside the body);
- GET `/products/search?q=query` (replacing `query` for the term you want to search) to search for products by name.

<hr></hr>

## Final considerations

It was a project to consolidate the organization of the MSC architecture, and consolidate the practice of unit tests for each layer of the MSC as well. I could also practice even more my MySQL queries before using an ORM like Sequelize. Here you can see a [project that I made using Sequelize](https://github.com/Brendon-Lopes/project-blogs-api).
