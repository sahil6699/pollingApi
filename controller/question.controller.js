const Question = require('../models/question.model')
const Option = require('../models/option.model')

// Create new Question
const createQuestion = async (req, res) => {
  try {
    // Checking if title exists
    const title = req.body.title
    if (!title) {
      res.status(400).send({ error: 'Please enter title for the question' })
    }
    // Checking if question is created
    const question = await Question.create({ title })
    if (!question) {
      return res.status(500).send({ message: 'Something went wrong' })
    }
    // Sending response
    return res.status(200).json({
      message: 'Question has been created!',
      data: question,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Create the option for the Question
const createOptions = async (req, res) => {
  try {
    const { text, votes } = req.body
    const questionId = req.params.id
    // Checking if question exists
    const question = await Question.findOne({ _id: questionId })
    if (!question) {
      return res.status(400).send({ message: 'Question does not exist' })
    }
    // Creating Option
    const newOption = await Option.create({ text, votes, questionId })
    if (!newOption) {
      return res.status(500).send('Something went wrong.')
    }
    // Making the link to vote and updating the option collection
    const link_to_vote = `${req.protocol}://${req.get('host')}/options/${
      newOption._id
    }/add_vote`
    const updateOption = await Option.findByIdAndUpdate(
      newOption._id,
      { link_to_vote },
      { new: true }
    )
    // Adding the option ID to question
    await Question.findByIdAndUpdate(questionId, {
      $push: { options: [newOption._id] },
    })
    // Sending response
    return res.status(200).json({
      message: 'Option is added to question!',
      data: updateOption,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      Error: 'Internal Server Error',
    })
  }
}

// Delete the Question
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      'options',
      'votes'
    )
    if (!question) {
      return res.status(400).json({ message: 'Question does not exist' })
    }
    // Checking the total number of votes
    const totalVotes = question.options.reduce((sum, order) => {
      return sum + order.votes
    }, 0)
    // Not deleting if votes found
    if (totalVotes > 0) {
      return res.status(300).send({
        message:
          "Question can't be deleted as one of its options has a vote or more.",
      })
    }
    return res.status(200).json({
      Message: 'Question has been deleted!',
    })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Question not found' })
    }
    return res.status(500).json({ error: error.message })
  }
}

// Get the Question by ID
const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      'options',
      'text votes link_to_vote'
    )
    return res.status(200).json(question)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Question does not exist' })
    }
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createOptions,
  createQuestion,
  deleteQuestion,
  getQuestion,
}
