
const mongoose = require('mongoose');
const category = require('./Category');
const Schama = mongoose.Schema;

const meetingSchema = new Schama(
    {
        id: {
            type: Number
        },
        date: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Meeting', meetingSchema)