// routes/celebrities.js

const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrityModel.js');

// find all the celebrities when click the link on home page
router.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
    .then(celebritiesFromDB => {
      // console.log('retrived celebrities from db: ', {celebrities: data})
      res.render('../celebrities/index', {celebrities: celebritiesFromDB})
    })
    .catch(error => {
      next();
      console.log('error from getting data from the db: ', error)
    });
})

// add new celebrity GET
router.get('/celebrities/new', (req, res) => {
  res.render('../celebrities/new')
})

// when clicked the name, goes to celebrity details
router.get('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id
  Celebrity.findById(celebrityId)
    .then(theCelebrity => res.render('../celebrities/show', theCelebrity))
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
    res.redirect(`../celebrities/${celebrity._id}`)
  })
  .catch(error => {
    console.log('error from adding new celebrity: ', error)
  })
})

// delete celebrities
router.post('/celebrities/delete/:id', (req, res) => {
  Celebrity.findByIdAndRemove({_id: req.params.id})
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.log('error from deleting a celebrity: ', error)
    })
  console.log('hshshs')
})

module.exports = router;