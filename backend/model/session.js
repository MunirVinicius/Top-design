const mongoose = require('mongoose')
const SessionSchema = new mongoose.Schema(
    {
    session: {type: String, required: true},
    },
    {collection: 'sessions' }
)

const model = mongoose.model('SessionSchema', SessionSchema)

module.exports = model