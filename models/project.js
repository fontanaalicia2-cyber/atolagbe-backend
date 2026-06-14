const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  capacity: String,
  status: { type: String, enum: ['Ongoing', 'Completed'], default: 'Ongoing' },
  description: String,
  coverImage: String,
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)