const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req, res){
    try {
        let post = Post.findById(req.params.id);
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post, 
                user : req.user._id
            });
                post.comments.push(comment);
                post.save();
                return res.redirect('/');;
    } catch (error) {
        return res.redirect('back');
    }
}