const mongoose = require('mongoose')

const userTransaction = new mongoose.Schema({
    type:{ //wether the tranaction is income or expense
        type:Boolean,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    amount:{
        type:Nuber,
        required:true
    },
    category:{
        type:String,
    }

})

const transaction = mongoose.model('user', userTransaction)
module.exports = transaction;