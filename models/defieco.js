const mongoose = require('mongoose')

const defiecoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Defieco', defiecoSchema)
