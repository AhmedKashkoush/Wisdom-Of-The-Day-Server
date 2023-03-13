const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WisdomSchema = new Schema({
    quoteEn: String,
    quoteAr: String,
    authorEn: String,
    authorAr: String,
    image: String
},{
    timestamps:true,
    versionKey: false
});

const Wisdom = mongoose.model('Wisdom',WisdomSchema);
module.exports = Wisdom;