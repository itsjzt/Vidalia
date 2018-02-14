const mongoose = require('mongoose')

// schema
const URLSchema = mongoose.Schema({
  original_url: String,
  short_url: String
})
// make a modal from schema
const URLModal = mongoose.model('URL', URLSchema)

module.exports = URLModal