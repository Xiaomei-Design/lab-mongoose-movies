// bin/seeds.js

const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity')
const Movie = require('../models/Movie')

const DB_NAME = 'lab-mongoose-movies';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movies = [
  {
  title: 'Star Wars',
  genre: 'Sci-Fi',
  plot: 'About xiaolaoshu',
  cast: {
    name: 'Natalie Portman',
    occupation: 'Actress',
    catchPhrase: 'You stupid boy'
  }
  },

  {
    title: 'My Brilliant Girlfriend',
    genre: 'Drama',
    plot: 'About two gils in Napels',
    cast: {
      name: 'Elena Ferrante',
      occupation: 'Actress',
      catchPhrase: 'Lila'
    }
  }
]


movies.forEach(movie => {
  Celebrity.create(movie.cast)
  .then(celebrity => {
    movie.cast = celebrity._id;
    Movie.create(movie);
  })
})

