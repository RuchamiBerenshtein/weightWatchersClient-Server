const { type } = require("express/lib/response");
const { MongoCredentials } = require("mongodb");
const  Meeting = require('./meetingModel');
const mongoose = require("mongoose");
const Schama = mongoose.Schema;

const addressSchama = new Schama({
    city: {
        type: String,
        min: 3
    },
    street: {
        type: String,
    },
    number: {
        type: Number,
        min: 1
    }
})

const diarySchema = new Schama(
    {
       
        date:{
            type: String,  
            required: true
        },
        breakfast:[String],
        lunch:[String],
        breakfast:[String],
        breakfast:[String]
    }, 
    {timestamps: true}
)

const userSchama = new Schama({
    id:{
        type: Number
    },
    details: {
        type: Object,
        firstName: {
            type: String,
            required: true,
            minlength: 5
        },
        lastName: {
            type: String,
            required: true,
            minlength: 5
        },
        address: { type: [addressSchama] },
        phone: {
            type: String,
            minlength: 9
        },
        email: {
            type: String,
            unique: true,
            required: true

        },
        hight: {
            type: Number,
            required: true,
            min: 5
        }, 
        meeting: [
            {
                
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Meeting"
                },
                weight: {
                    type: Number
                }
            }],
        diary:[
            {
            type: [diarySchema]    
        }] 

    }
}, { timestamps: true })

userSchama.virtual('userOrders', {
    ref: 'Orders',
    localField: '_id',
    foreignField: 'userId'
}
);

userSchama.set('toJSON', { virtuals: true })

module.exports = mongoose.model('user', userSchama)
