const Option = require('../models/option.model')
const Question = require('../models/question.model')

// Deleting option
const deleteOption = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id)
    if (!option) {
      return res.status(400).send({ message: 'Please enter correct Option Id' })
    }
    if (option.votes) {
      return res.status(400).json({
        message: "Can't delete option with a vote",
      })
    }
    // Deleting option from Option and Question collections
    const deleted = await Option.findByIdAndDelete(option._id)
    const deletedFromQuestion = await Question.findByIdAndUpdate(
      option.questionId,
      { $pull: { options: { $in: option._id } } },
      { new: true, upsert: true }
    )
    console.log(deleted, deletedFromQuestion)
    if (deleted && deletedFromQuestion) {
      return res.status(202).json({
        message: 'Option has been deleted!',
      })
    }
    res.status(500).json({ message: 'Something went wrong!' })
  } catch (err) {
    if (err.name == 'CastError')
      return res.status(400).json({ message: 'Please enter correct Option ID' })
    return res.status(500).json({ err })
  }
}

// Increment the vote
const incrementVote = async (req, res) => {
  try {
    const option = await Option.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    )
    if (!option) {
      return res.status(400).send({ message: 'Wrong option ID entered' })
    }
    return res.status(200).json({
      message: 'Updated Successfully!',
      data: option,
    })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Wrong option ID entered' })
    }
    return res.status(400).send({ error })
  }
}

module.exports = { incrementVote, deleteOption }
