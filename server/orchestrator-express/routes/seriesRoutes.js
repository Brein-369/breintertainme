const express = require('express')
const router = express.Router()
const allSeriesCont = require('../controllers/seriesController')

router.get('/', allSeriesCont.getAllSeries)

module.exports = router