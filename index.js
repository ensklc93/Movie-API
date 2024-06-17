const express = require('express'),
  morgan = require('morgan');

const app = express()

let myMovies = [
  {
    title: "2001: A Space Odyssey",
    director: "Stanley Kubrick",
  },
  {
    title: "Shining",
    director: "Stanley Kubrick",
  },
  {
    title: "The Patriot",
    director: "Roland Emmerich",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
  },
  {
    title: "Climax",
    director: "Gaspar Noé",
  },
  {
    title: "The Matrix",
    director: "The Wachowskis",
  },
  {
    title: "Schindler's List",
    director: "Steven Spielberg",
  },
  {
    title: "Mulholland Drive",
    director: "David Lynch",
  },
  {
    title: "Memento",
    director: "Christopher Nolan",
  },
  {
    title: "The The Lord of the Rings: The Fellowship of the Ring",
    director: "Peter Jackson",
  },
]

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/movies', (req, res) => {
  res.json(myMovies);
});

app.get('/', (req, res) => {
  res.send('Welcome to my Movie Archive!')
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
});