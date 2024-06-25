const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan")

const mongoose = require("mongoose")
const Models = require("./models.js")

const Movies = Models.Movie
const Users = Models.User

const app = express()

mongoose.connect("mongodb://localhost:27017/cfDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(bodyParser.json())

app.use(express.static("public"))
app.use(morgan("common"))

app.get("/", (req, res) => {
  res.send("Welcome to my Movie Archive!")
})

app.get("/movies", async (req, res) => {
  await Movies.find()
    .then(movies => {
      res.status(201).json(movies)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Error: " + err)
    })
})

app.get("/movies/:Title", async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.json(movie)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Error: " + err)
    })
})

app.get("/movies/genre/:name", async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.name })
    .then(movie => {
      res.status(201).json(movie.Genre)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Error: " + err)
    })
})

app.get("/movies/directors/:name", async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.name })
    .then(movie => {
      res.status(201).json(movie.Director)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Error: " + err)
    })
})

app.post("/users", async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists")
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then(user => {
            res.status(201).json(user)
          })
          .catch(error => {
            console.error(error)
            res.status(500).send("Error: " + error)
          })
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).send("Error: " + error)
    })
})

app.get("/users", async (req, res) => {
  await Users.find()
    .then(users => {
      res.status(201).json(users)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Error: " + err)
    })
})

app.get("/users/:Username", async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Error: " + err)
    })
})

app.put("/users/:Username", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
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
})

app.post("/users/:Username/movies/:MovieID", async (req, res) => {
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
})

app.delete("/users/:Username/movies/:MovieID", async (req, res) => {
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
})

app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
}); 

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(8080, () => {
  console.log("App is listening on port 8080")
})