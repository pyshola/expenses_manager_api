This is a portfolio project for ALX to showcase the skills and experience earned in the ALX Software Engineering program for the foundational period.

The Expenses Manager API is organized around REST. The API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

You can use the Expenses Manager API in to manage expenses, You can wrap the API to your Web, Mobile App, and others.

<h3>Expenses Manager API features</h3>
<ul>
  <li>Expenses Category - Where you can categorize your expenses</li>
  <li>Expenses - Post / Get Expenses</li>
  <li>Expenses Limit - Set Expenses Daily Limit</li>
  <li>Reports - Get Expenses report, summary report.</li>
</ul>

<h3>Technologies</h3> 

- Node JS
- JavaScript
- Express JS
- Sequelize
- PostgreSQL

## Setup

- Clone this repository to your local machine using

```
  $ git clone https://github.com/pyshola/expenses_manager_api.git
```

  $ cd expenses_manager_api
  ```

- Install the required dependencies

  ```
  $ npm install
  ```

- Create a .env file in the root directory of the project and add the following environment variables

  ```

  POSTGRESS_USERNAME = your_postgress_username
  POSTGRESS_PASSWORD = your_postgress_password
  POSTGRESS_DB = your_postgress_db
  POSTGRESS_HOST = your_postgress_host
  POSTGRESS_PORT = your_postgress_port


Run the application

  ```
  $ npm run start-server
  ```

- The application should now be running at http://localhost:5000

## API Documentation

The API documentation for this project can be found [here](https://documenter.getpostman.com/view/13392160/Tz5tZ6QJ)

## Author

- [Shola Onoriemu](https://github.com/pyshola) - (https://github.com/pyshola)
