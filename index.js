const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan")

const app = express()

app.use(bodyParser.json())

let myMovies = [
  {
    title: "2001: A Space Odyssey",
    director: "Stanley Kubrick",
    genre: "Sci-Fi",
    description:
      "An imposing black structure provides a connection between the past and the future in this enigmatic adaptation of a short story by revered sci-fi author Arthur C. Clarke. When Dr. Dave Bowman (Keir Dullea) and other astronauts are sent on a mysterious mission, their ship's computer system, HAL, begins to display increasingly strange behavior, leading up to a tense showdown between man and machine that results in a mind-bending trek through space and time.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/1/11/2001_A_Space_Odyssey_%281968%29.png",
    isFeatured: "yes",
  },
  {
    title: "The Patriot",
    director: "Roland Emmerich",
    genre: ["Horror", "Mystery", "Thriller"],
    description:
      "Jack Torrance (Jack Nicholson) becomes winter caretaker at the isolated Overlook Hotel in Colorado, hoping to cure his writer's block. He settles in along with his wife, Wendy (Shelley Duvall), and his son, Danny (Danny Lloyd), who is plagued by psychic premonitions. As Jack's writing goes nowhere and Danny's visions become more disturbing, Jack discovers the hotel's dark secrets and begins to unravel into a homicidal maniac hell-bent on terrorizing his family.",
    imageUrl: "https://de.wikipedia.org/wiki/Datei:Theshining-logo.svg",
    isFeatured: "yes",
  },
  {
    title: "Shining",
    director: "Stanley Kubrick",
    genre: ["Horror", "Mystery", "Thriller"],
    description:
      "Jack Torrance (Jack Nicholson) becomes winter caretaker at the isolated Overlook Hotel in Colorado, hoping to cure his writer's block. He settles in along with his wife, Wendy (Shelley Duvall), and his son, Danny (Danny Lloyd), who is plagued by psychic premonitions. As Jack's writing goes nowhere and Danny's visions become more disturbing, Jack discovers the hotel's dark secrets and begins to unravel into a homicidal maniac hell-bent on terrorizing his family.",
    imageUrl: "https://de.wikipedia.org/wiki/Datei:Theshining-logo.svg",
    isFeatured: "yes",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
  },
  {
    title: "Climax",
    director: "Gaspar Noé",
    genre: ["Drama", "Music", "Horror"],
    description:
      "When members of a dance troupe are lured to an empty school, drug-laced sangria causes their jubilant rehearsal to descend into a dark and explosive nightmare as they try to survive the night -- and find out who's responsible -- before it's too late.",
    imageUrl:
      "https://en.wikipedia.org/wiki/File:Climax_(2018_film_poster).jpg",
    isFeatured: "yes",
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

let myGenre = [
  {
    name: "Sci-Fi",
    description:
      "Science fiction (sometimes shortened to SF or sci-fi) is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It is related to fantasy, horror, and superhero fiction and contains many subgenres. Its exact definition has long been disputed among authors, critics, scholars, and readers.",
  },
  {
    name: "Thriller",
    description:
      "Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror, and detective fiction. Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiety.[1] This genre is well suited to film and television.",
  },
  {
    name: "Drama",
    description:
      "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] The drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject matter, or they combine a drama's otherwise serious tone with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline.",
  },
]

let myDirectors = [
  {
    name: "Stanley Kubrick",
    bio: "Stanley Kubrick was an American film director, screenwriter, producer, and photographer. Widely considered one of the greatest filmmakers of all time, his films were nearly all adaptations of novels or short stories, spanning a number of genres and gaining recognition for their intense attention to detail, innovative cinematography, extensive set design, and dark humor.",
    yearofbirth: "1928",
    yearofdeath: "1999",
  },
  {
    name: "Steven Spielberg",
    bio: 'Steven Allan Spielberg is an American filmmaker. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in film history.[1] He is the recipient of many accolades, including three Academy Awards, two BAFTA Awards, nine Golden Globe Awards, and four Directors Guild of America Awards, as well as the AFI Life Achievement Award in 1995, the Kennedy Center Honor in 2006, the Cecil B. DeMille Award in 2009 and the Presidential Medal of Freedom in 2015. Seven of his films have been inducted into the National Film Registry by the Library of Congress as "culturally, historically or aesthetically significant".',
    yearofbirth: "1946",
    yearofdeath: "-",
  },
  {
    name: "Christopher Nolan",
    bio: "Sir Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, he is considered a leading filmmaker of the 21st century. Nolan's films have earned over $6 billion worldwide, making him the seventh-highest-grossing film director of all time. His accolades include two Academy Awards and two British Academy Film Awards. Nolan was appointed as a Commander of the Order of the British Empire in 2019, and received a knighthood in 2024 for his contributions to film.",
    yearofbirth: "1970",
    yearofdeath: "-",
  },
]

let users = [
  {
    username: "ensklc",
    favmovies: "The Lord of the Rings",
  },
]

app.use(express.static("public"))
app.use(morgan("common"))

app.get("/", (req, res) => {
  res.send("Welcome to my Movie Archive!")
})

app.get("/movies", (req, res) => {
  res.json(myMovies)
})

app.get("/movies/:title", (req, res) => {
  res.json(
    myMovies.find(movie => {
      return movie.title === req.params.title
    })
  )
})

app.get("/movies/genre/:name", (req, res) => {
  res.json(
    myGenre.find(element => {
      return element.name === req.params.name
    })
  )
})

app.get("/movies/directors/:name", (req, res) => {
  res.json(
    myDirectors.find(director => {
      return director.name === req.params.name
    })
  )
})

app.post("/users", (req, res) => {
  let newUser = req.body

  if (!newUser.username) {
    const message = 'Missing "name" in request body'
    res.status(400).send(message)
  } else {
    users.push(newUser)
    res.status(201).send(newUser)
  }
})

app.put("/users/:username", (req, res) => {
  let user = users.find(user => {
    return user.username === req.params.username
  })

  if (user) {
    res.status(201).send("Username has been successfully updated!")
  } else {
    res.status(404).send("Username was not found!")
  }
})

app.post("/users/:username/:favmovies", (req, res) => {
  res.status(201).send("Movie successfully added to Favourites list!")
})

app.delete("/users/:username/:favmovies", (req, res) => {
  res.status(201).send("Movie successfully deleted from Favorites list!")
})

app.delete("/users/:username", (req, res) => {
  res.status(201).send("User successfully deleted!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(8080, () => {
  console.log("App is listening on port 8080")
})
