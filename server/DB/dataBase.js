const mongoose = require('mongoose');



class MongooseClass {

    constructor(){
    }

    async connect() {
        const url = "mongodb://localhost:27017/bootcamp" ;
        await mongoose.connect(url);
        console.log(`we connected with mongoose`);
    };
}


module.exports = new MongooseClass();