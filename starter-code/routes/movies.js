// routes/movies.js

const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie')

router.get('/movies', (req, res, next) => {
  Movie.find({})
    .then(moviesFromDB => {
      // console.log('retrived movies from db: ', {movies: moviesFromDB})
      res.render('../movies/index', {movies: moviesFromDB})
    })
    .catch(error => {
      next();
      console.log('error from getting data from the db: ', error)
    });
})

router.get('/movies/new', (req, res) => {
  Movie.find()
   .then(celebrity => {
    res.render('../movies/form', {cast: celebrity})
   })
   .catch(err => {
     console.log(err)
   })
})

router.get('/movies/:id', (req, res) => {
  Movie.findById(req.params.id).populate('cast')
   .then(movie => {
     res.render('../movies/movieDetails', {movieDetails: movie})
   })
})

router.post('/movies/new', (req, res) => {
  const {title, genre, plot, cast} = req.body;
  Movie.create({
      title,
      genre,
      plot,
      cast
  })
   .then(movie => {
     res.redirect(`../movies/${movie._id}`)
   })
   .catch(err => console.log('error while adding movie to database: ', err));
})

router.get('/movies/edit/:id', (req, res) => {
  Movie.findById(req.params.id)
   .then(movie => {
     res.render('../movies/movieEdit', {movie})
   })
})

router.post('/movies/edit/:id', (req, res) => {
  console.log('skksk')
  // const {title, genre, plot, cast} = req.body;
  // Movie.findByIdAndUpdate(req.params.id, {
  //   title,
  //   genre,
  //   plot,
  //   cast
  // })
  //  .then(movie => {
  //   //  console.log('jshgshjs')
  //   res.redirect(`../movies/${movie._id}`)
  //  })
  //  .catch(err => console.log('error while editing: ', err))
})

module.exports = router;