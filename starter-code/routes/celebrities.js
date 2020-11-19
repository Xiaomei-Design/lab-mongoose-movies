// routes/celebrities.js

const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

// find all the celebrities when click the link on home page
router.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
    .then(celebritiesFromDB => {
      console.log('retrived celebrities from db: ', {celebrities: celebritiesFromDB})
      res.render('celebrities/index', {celebrities: celebritiesFromDB})
    })
    .catch(error => {
      next();
      console.log('error from getting data from the db: ', error)
    });
})

// add new celebrity GET
router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new')
})

// when clicked the name, goes to celebrity details
router.get('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id
  Celebrity.findById(celebrityId)
    .then(theCelebrity => res.render('celebrities/show', {theCelebrity: theCelebrity}))
    .catch(error => {
      next();
      console.log('error from findById: ', error)
    })
})

// add new celebrity
router.post('/celebrities/new', (req, res) => {
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  })
  .then(celebrity => {
    console.log(`${celebrity.name} was added to the database`);
    res.redirect(`/celebrities/${celebrity._id}`) //??????
  })
  .catch(error => {
    console.log('error from adding new celebrity: ', error)
  })
})

// edit GET
router.get('/celebrities/:id/edit', (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then(celebrity => {
      res.render('celebrities/edit', {celebrity})
    })
    .catch(error => console.log(error))
})

// delete celebrities

router.post('/celebrities/:id/delete', (req, res) => {
  Celebrity.findOneAndDelete({_id: req.params.id})
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.log('error from deleting a celebrity: ', error)
    })
})

// edit POST

router.post('/celebrities/:id/edit', (req, res) => {
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase
  })
  .then(celebrity => {
    console.log(`${celebrity.name} was edited to the database`);
    res.redirect(`/celebrities/${celebrity._id}`) //?????????
  })
  .catch(error => console.log(error))
})

module.exports = router;