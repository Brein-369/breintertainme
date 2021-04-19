const express = require('express')
const router = express.Router()
const entertainmeRoutes =  require('./entertainmeRoutes')
const movieRoutes =  require('./movieRoutes')
const SeriesRoutes =  require('./seriesRoutes')

router.use('/', entertainmeRoutes)
router.use('/movies', movieRoutes)
router.use('/series', SeriesRoutes)

module.exports = router