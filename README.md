+++
# Sales Management

This project is a RESTful API for sales management, developed as part of a selection process for a back-end internship position.

## Features

- **User Authentication**:
  - Registration of new users with email and password.
  - Login of existing users.
  - Authentication based on JSON Web Tokens (JWT).

- **Sales CRUD**:
  - Query all sales.
  - Add new sales (customer, product, value, date).
  - Edit existing sales.
  - Delete sales.
  
- **PDF Report Generation**:
  - Generates a PDF report with sales within a specified date range.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime environment.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Express**: Minimalist web framework for Node.js.
- **SQLite**: Lightweight, embedded relational database.
- **JWT**: Standard for creating secure access tokens.

## Setup and Execution

Clone the repository:

  ```sh
    git clone https://github.com/your-username/sales-api.git
```

Install dependencies:

  ```sh
    npm install
  ```

Run the application:

  ```sh
    npm start
  ```

## Endpoints

| Method | Endpoint      | Description                               | Authentication (JWT) |
|--------|---------------|-------------------------------------------|----------------------|
| POST   | /register     | Registers a new user                      | No                   |
| POST   | /login        | Authenticates a user and returns a JWT token | No                 |
| GET    | /sales        | Lists all sales                           | Yes                  |
| GET    | /sales/:id    | Lists a specific sale by id               | Yes                  |
| GET    | /sales/user/:userId  | Lists all sales made by a user     | Yes                  |
| POST   | /sales        | Creates a new sale                        | Yes                  |
| PUT    | /sales/:id    | Updates an existing sale                  | Yes                  |
| DELETE | /sales/:id    | Deletes a sale                            | Yes                  |
| GET    | /sales/pdf    | Generates a PDF of sales (with date filters) | Yes               |


## License
This project is under the MIT license. See the LICENSE file for more details.

Made by Your wallysom2!
