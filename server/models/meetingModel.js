
const mongoose = require('mongoose');
const Schama = mongoose.Schema;

const meetingSchema = new Schama(
    {
       
        date: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Meeting', meetingSchema)