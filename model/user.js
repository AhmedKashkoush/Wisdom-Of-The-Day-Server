const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    name:{
        type: String,
        required: true
    },
    birthDay: {
        type: Date,
        required:true,
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    image: String,
    wisdom:{
        type: Schema.Types.ObjectId,
        ref: 'Wisdom'
    }
},{
    timestamps:true,
    versionKey: false
});

const User = mongoose.model('User',schema);
module.exports = User;