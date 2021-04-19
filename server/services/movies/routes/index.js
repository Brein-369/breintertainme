const express = require('express')
const router = express.Router()
const movieController = require('../controllers/controller')



router.get('/', movieController.getAll)
router.post('/', movieController.createOne)
router.get('/:id', movieController.getOne)
router.put('/:id', movieController.updateOne)
router.delete('/:id', movieController.deleteOne)



module.exports = router