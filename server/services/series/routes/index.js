const express = require('express')
const router = express.Router()
const SeriesController = require('../controllers/controller')



router.get('/', SeriesController.getAll)
router.post('/', SeriesController.createOne)
router.get('/:id', SeriesController.getOne)
router.put('/:id', SeriesController.updateOne)
router.delete('/:id', SeriesController.deleteOne)



module.exports = router