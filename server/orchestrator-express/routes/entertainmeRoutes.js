const express = require('express')
const router = express.Router()
const entertainmeCont = require('../controllers/entertainmeController')

router.get('/', entertainmeCont.getAllDataEntertainme)

module.exports = router