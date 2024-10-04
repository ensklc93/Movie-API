# Movie API

## Description
The Movie API is a server-side component of a movie web application that allows users to manage and retrieve movie data. It features user authentication using JWT, and provides various endpoints for accessing movie information and user profiles.

## Features

- **User Authentication**: Secure user authentication using [JWT](https://jwt.io/).
- **CRUD Operations**: 
    - Create, read, update, and delete user profiles.
    - Add and remove movies from a user's list of favorites.
- **Movie Information**: Retrieve detailed information about movies, directors, and genres.


## API Endpoints
For a complete list of API endpoints and their documentation, refer to the [API Documentation](https://github.com/ensklc93/Movie-API/blob/main/public/documentation.html)

### Movies

- **Get All Movies**
  - `GET /movies`
  - Returns a list of all movies.

- **Get Movie by Title**
  - `GET /movies/:Title`
  - Returns details of a movie by its title.

- **Get Genre by Name**
  - `GET /movies/genre/:name`
  - Returns details of a genre by its name.

- **Get Director by Name**
  - `GET /movies/directors/:name`
  - Returns details of a director by their name.

### Users

- **Create a New User**
  - `POST /users`
  - Creates a new user with the provided username, password, email, and birthday.

- **Get All Users**
  - `GET /users`
  - Returns a list of all users.

- **Get User by Username**
  - `GET /users/:Username`
  - Returns details of a user by their username.

- **Update User Information**
  - `PUT /users/:Username`
  - Updates the user's information based on the provided data.

- **Delete User by Username**
  - `DELETE /users/:Username`
  - Deletes a user from the system.

- **Add a Movie to User's Favorites**
  - `POST /users/:Username/movies/:MovieID`
  - Adds a movie to the user's list of favorite movies.

- **Remove a Movie from User's Favorites**
  - `DELETE /users/:Username/movies/:MovieID`
  - Removes a movie from the user's list of favorite movies.

## Technologies Used

- **[Node.js](https://nodejs.org/)**: JavaScript runtime environment.
- **[Express](https://expressjs.com/)**: Web framework for Node.js.
- **[MongoDB](https://www.mongodb.com/)**: NoSQL database for storing user and movie data.
- **[Mongoose](https://mongoosejs.com/)**: ODM for MongoDB.
- **[Passport](http://www.passportjs.org/)**: Authentication middleware for Node.js.
- **[JWT](https://jwt.io/)**: JSON Web Tokens for secure user authentication.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**: Library for hashing passwords.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ensklc93/Movie-API.git
   ```

2. Install dependencies:
    ```bash
    cd Movie-API
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add your MongoDB connection string and JWT secret:
    ```bash
    CONNECTION_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Access the API at http://localhost:3000.

## License

This project is licensed under the ISC License.