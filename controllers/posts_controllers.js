const Post = require('../models/post');

module.exports.postPage = async function(req, res){
    try {
        let posts = await Post.find({})
        .populate('user');
    
        res.render('post', {
            title : "Make Post",
            posts : posts
        });
        
    } catch (error) {
       console.log(`Error in finding post ${error}`);
    }
    
};
module.exports.create = async function(req, res){
    try {
        await Post.create({
            content : req.body.content,
            user : req.user._id
        });

        return res.redirect('back');
    } catch (error) {
        console.log(`Error in creating post ${error}`);
        return;
    }
}