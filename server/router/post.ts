export { };
const express = require('express');
const router = express.Router();

const Post = require('../model/Post');
const verifyToken = require('../middleware/auth');

// @router GET /post
//  @access Private
router.get('/', verifyToken, async (req: any, res: any) => {
    try {
        const post_list = await Post.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, post_list });
    } catch (error) {
        return res.status(500).json({ success: true, message: 'Server internal error' })
    }
})

// @router POST /post
// @access Private
router.post('/', verifyToken, async (req: any, res: any) => {
    const { title, description, url, status } = req.body;
    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' });
    }

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('http://') ? url : `http://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        });


        await newPost.save();

        res.json({
            success: true,
            message: 'Happy learning!!',
            post: newPost,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

module.exports = router;