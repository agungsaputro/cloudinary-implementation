const mongoose = require('mongoose');
const imageUpload = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    addImage:{
        type: String,
        required: true
    },
    post_date:{
        type: Date,
        defult: Date.now
    }
})

module.exports = mongoose.model('imageUpload', imageUpload);