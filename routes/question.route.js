const express = require('express')
const router = express.Router()
const {
  createQuestion,
  deleteQuestion,
  createOptions,
  getQuestion,
} = require('../controller/question.controller')

// Question Routes
router.post('/create', createQuestion) //Create
router.post('/:id/options/create', createOptions) //CreateOption
router.delete('/:id/delete', deleteQuestion) //Delete
router.get('/:id', getQuestion) //Show all questions

module.exports = router
