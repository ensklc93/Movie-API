/**
 * @module auth
 */

const jwtSecret = 'your_jwt_secret'; // The same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // local passport file

/**
 * Generates a JWT token for a user.
 * 
 * @param {object} user - The user object for whom the token is being generated.
 * @returns {string} - The JWT token.
 */

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username encoding in the JWT
    expiresIn: '7d', // Token expiration time
    algorithm: 'HS256' // Algorithm used for signing the token
  });
}

/**
 * POST login route. Authenticates user and returns a JWT token if successful.
 * 
 * @param {object} router - Express router.
 */

module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}