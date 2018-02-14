const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise
// connect
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection
db.on('error', e => console.log('failed to connect the database'))
db.once('open', e => console.log('connected to db'))

module.exports = mongoose