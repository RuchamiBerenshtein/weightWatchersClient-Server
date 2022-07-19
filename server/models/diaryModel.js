
const mongoose = require('mongoose');
const Schama = mongoose.Schema;

const diarySchema = new Schama(
    {
       
        date:{
            type: String,  
            required: true
        },
        breakfast:[String],
        lunch:[String],
        dinner:[String],
        snack:[String]
    }, 
    {timestamps: true}
)

module.exports = mongoose.model('Diary', diarySchema)