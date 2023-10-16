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


The API documentation for this project
POST /api/users  -  should create a new user in Database and Generate API authentication key.<br>
      @required email =>String<br>
      @required password => String<br>
      @required name => String<br>
      @required phone => String<br>
      Return - API key: { "apiKey": "sk_36dbc50d-ed10-428e-9dc6-3b599552dbfd"} with a status code 201.<br>
      
GET /api/connect - Regenerate API authentication key<br>
      @required email =>String<br>
      @required password => String<br>
      Return - API key: { "apiKey": "sk_36dbc50d-ed10-428e-9dc6-3a78thh778uhh4"} with a status code 200<br>

GET /api/disconnect   - sign-out the user based on the token:<br>
    @required - Autorization header X-Token, API key.<br>
    Return - delete the API key and return nothing with a status code 204<br>
  
GET /api/users/me - retrieve the user base on the API key used<br>
    @required - Autorization header X-Token, API key.<br>
    Return - return the user object (name, phone, and email)<br>

POST /api/expensescategory - create a new expenses category in Database.<br>
    @required - Autorization header X-Token, API key.<br>
    @required - name => String<br>
    Return - return expensescategory object (id, and name)<br>

GET /api/expensescategory - retrieve all expenses category.<br>
    @required - Autorization header X-Token, API key.<br>
    Return - return array expensescategory object (id, and name)<br>
    
PUT /api/expensescategory/:id - update a expenses category in Database based on ID.<br>
    @required - Autorization header X-Token, API key.<br>
    @required - id => expenses category id<br>
    @required - name => String<br>
    Return - return updated expensescategory object (id, and name)<br>
    
DELETE /api/expensescategory/:id - delete a expenses category in Database based on ID.<br>
    @required - Autorization header X-Token, API key.<br>
    @required - id => request parameter<br>
    Return - return nothing with a status code 204<br>
    
POST /api/expenses - create a new expense in Database.<br>
    @required - Autorization header X-Token, API key.<br>
    @required - amount => Number<br>
    @required - description => String<br>
    @required - category => Number | String (category id or name)<br>
                Create new expenses category if not exist<br>
    Return - return expenses object (id, amount, category, and description)<br>
    
GET /api/expenses - retrieve all expenses between specify start and end date.<br>
    @required - Autorization header X-Token, API key.<br>
    Return - return array expenses object (id, amount, category, and description)<br>
    
PUT /api/expenses/:id - update a expenses in Database based on ID.<br>
    @required - Autorization header X-Token, API key.<br>
    @required - id => expenses id<br>
    @required - amount => Number<br>
    @required - description => String<br>
    @required - category => Number | String (category id or name)<br>
                Create new expenses category if not exist<br>                
    Return - return updated expenses object (id, amount, category, and description)<br>
    
DELETE /api/expenses/:id - delete a expenses in Database based on ID.<br>
    @required - Autorization header X-Token, API key.<br>
    @required - id => request parameter<br>
    Return - return nothing with a status code 204<br>
    
GET /api/expenses/category - retrieve all expenses summarize by category between specify start and end date.<br>
    @required - Autorization header X-Token, API key.<br>
    Return - return expenses summary by category object (category and amount)<br>



## Author

- [Shola Onoriemu](https://github.com/pyshola) - (https://github.com/pyshola)
