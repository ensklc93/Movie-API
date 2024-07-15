const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan")
  

const mongoose = require("mongoose")
const Models = require("./models.js")

const Movies = Models.Movie
const Users = Models.User

const app = express()

const { check, validationResult } = require('express-validator');

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const cors = require("cors")
app.use(cors())

let auth = require("./auth")(app)

const passport = require("passport")
require("./passport.js")

app.use(express.static("public"))
app.use(morgan("common"))

app.get("/", (req, res) => {
  res.send("Welcome to my Movie Archive!")
})

app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find()
      .then(movies => {
        res.status(200).json(movies)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ Title: req.params.Title })
      .then(movie => {
        res.json(movie)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.get(
  "/movies/genre/:name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ "Genre.Name": req.params.name })
      .then(movie => {
        res.status(200).json(movie.Genre)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.get(
  "/movies/directors/:name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ "Director.Name": req.params.name })
      .then(movie => {
        res.status(200).json(movie.Director)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.post('/users',
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(200).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.put(
  "/users/:Username",
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ],
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);

    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied")
    }

    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        },
      },
      { new: true }
    ) // This line makes sure that the updated document is returned
      .then(updatedUser => {
        res.json(updatedUser)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.post("/users/:Username/movies/:MovieID",
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('MovieID', 'Movie contains non alphanumeric characters').isAlphanumeric(),
  ],
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }
    ) // This line makes sure that the updated document is returned
      .then(updatedUser => {
        res.json(updatedUser)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }
    ) // This line makes sure that the updated document is returned
      .then(updatedUser => {
        res.json(updatedUser)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndDelete({ Username: req.params.Username })
      .then(user => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found")
        } else {
          res.status(200).send(req.params.Username + " was deleted.")
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send("Error: " + err)
      })
  }
)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

