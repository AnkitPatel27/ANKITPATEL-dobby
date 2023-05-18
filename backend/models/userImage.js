const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        data:{
            type:Buffer,
            required:true
        },
        contentType:{
            type:String,    
            required:true
        }
    }
});

const Image = mongoose.model('image',imageSchema);
module.exports = Image;