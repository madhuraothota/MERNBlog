const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema ({
    title : {
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    markdown : {
        type : String,
        required : true
    },
   
},

{versionKey: false, timestamps: { createdAt :true, updatedAt: true}}

);

module.exports = mongoose.model("Blog",blogSchema);