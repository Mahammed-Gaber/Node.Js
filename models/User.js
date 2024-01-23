const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    password:{
        type : String
    },
    date: {
        type: Date,
        default: Date.now
    },
    follower:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})


const User = mongoose.model('User', userSchema);
User.createIndexes({userName:1})
module.exports = User;
