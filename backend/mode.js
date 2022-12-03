const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Location = new Schema({
    date : Date,
    loc : [
        {
            lat : Number,
            lng : Number
        }
    ]
})

module.exports = mongoose.model('location',Location);