const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema;

const postSchema = new mongooseSchema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comments : [
        {
            type : mongooseSchema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;