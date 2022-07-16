const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please pass in question ID'],
    ref: 'Question',
  },
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  link_to_vote: String,
})

module.exports = mongoose.model('Option', optionSchema)
