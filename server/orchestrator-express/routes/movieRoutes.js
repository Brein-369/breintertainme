const express = require('express')
const router = express.Router()
const allMovieCont = require('../controllers/movieController')

router.get('/', allMovieCont.getAllMovies)

module.exports = router