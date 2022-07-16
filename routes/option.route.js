const express = require('express')
const router = express.Router()
const {
  deleteOption,
  incrementVote,
} = require('../controller/option.controller')

// Route for Deleting an option
router.delete('/:id/delete', deleteOption)
// Route for increment vote in an option
router.get('/:id/add_vote', incrementVote)

module.exports = router
