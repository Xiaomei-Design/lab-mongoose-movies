// bin/seeds.js

const mongoose = require('mongoose');
const Celebrity = require('../models/celebrityModel.js')

const DB_NAME = 'lab-mongoose-movies';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const celebrities = [
  {
    name: 'Juliette Binoche',
    occupation: 'actress',
    catchPhrase: 'You stupid boy'
  },

  {
    name: 'Natalie Portman',
    occupation: 'actress',
    catchPhrase: "I'm Free"
  },

  {
    name: 'Jennifer Aniston',
    occupation: 'actress',
    catchPhrase: 'If you’re not happy, you can become happy.'
  },
];

Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error happend when created celebrities in the DB: `, err))
