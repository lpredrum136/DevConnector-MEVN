const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Models
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      const post = new Post(newPost);
      await post.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private (have to login to see posts page)
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // Newest first
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private (have to login to see posts page)
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(400).json({ msg: 'Post not found' });
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private (have to login to delete post)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Make sure post exist
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // Make sure user is authorised to delete the post, i.e. he posted it
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorised' });

    await post.remove();
    res.json({ msg: 'Post deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post is already liked
    if (
      post.likes.filter(like => like.user.toString() == req.user.id).length > 0
    )
      return res.status(400).json({ msg: 'Post already liked' });

    // If not
    const newLike = { user: req.user.id };
    post.likes.unshift(newLike);
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if user already liked it
    if (
      post.likes.filter(like => like.user.toString() == req.user.id).length > 0
    ) {
      // Remove it
      const removeIndex = post.likes.findIndex(
        like => like.user.toString() == req.user.id
      );
      post.likes.splice(removeIndex, 1);
      await post.save();

      res.json(post.likes);
    } else {
      return res.status(400).json({ msg: 'You must like the post first' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post with that id
// @access  Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.user.id).select('-password');

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment with commend_id in post with post_id
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id == req.params.comment_id
    );

    // Make sure comment exists
    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });

    // Check user if he is authorised to delete comment, i.e. he posted it
    if (req.user.id !== comment.user.toString())
      return res.status(401).json({ msg: 'User not authorised' });

    // Find the comment
    const removeIndex = post.comments.findIndex(
      comment => comment.id == req.params.comment_id
    );

    // Remove it
    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
