/**
 * @file models.js
 * @description This file defines the Mongoose schemas for Movies and Users.
 */

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


/**
 * Movie schema.
 * @constructor Movie
 * @param {string} Title - Movie title.
 * @param {string} Description - Description of the movie.
 * @param {object} Genre - Genre object with Name and Description.
 * @param {object} Director - Director object with Name and Bio.
 * @param {string} ImagePath - Path to the movie image.
 * @param {boolean} Featured - Whether the movie is featured.
 */

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
      Name: String,
      Description: String
    },
    Director: {
      Name: String,
      Bio: String
    },
    ImagePath: String,
    Featured: Boolean
  });
  
  /**
 * User schema.
 * @constructor User
 * @param {string} Username - Username of the user.
 * @param {string} Password - Password of the user.
 * @param {string} Email - Email of the user.
 * @param {Date} Birthday - User's birthday.
 * @param {Array} FavoriteMovies - Array of favorite movies.
 */

  let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
  });
  
  /**
 * Hashes a password.
 * @param {string} password - The password to hash.
 * @returns {string} - The hashed password.
 */

  userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };
  
  /**
 * Validates a password.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Whether the password is valid.
 */

  userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
  };
  
  let Movie = mongoose.model('Movie', movieSchema);
  let User = mongoose.model('User', userSchema);
  
  module.exports.Movie = Movie;
  module.exports.User = User;
