const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;

const commentSchema = mongooseSchema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongooseSchema.Types.ObjectId,
        ref : 'User'
    },
    post : {
        type : mongooseSchema.Types.ObjectId,
        ref : 'Post'
    }
},{
    timestamps : true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;