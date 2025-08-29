const express = require('express');
const router = express.Router();

// In-memory storage for posts (temporary solution)
let posts = []
let nextId = 1

// Fetch all posts
router.get('/', (req, res) => {
  res.send({
    posts: [...posts].reverse()
  })
})

// Add new post
router.post('/', (req, res) => {
  const { title, description } = req.body
  const newPost = {
    _id: nextId++,
    title: title,
    description: description
  }
  posts.push(newPost)
  res.send({
    success: true,
    message: 'Post saved successfully!'
  })
})

// Fetch single post
router.get('/:id', (req, res) => {
  const post = posts.find(p => p._id == req.params.id)
  if (post) {
    res.send(post)
  } else {
    res.status(404).send({ error: 'Post not found' })
  }
})

// Update a post
router.put('/:id', (req, res) => {
  const post = posts.find(p => p._id == req.params.id)
  if (post) {
    post.title = req.body.title
    post.description = req.body.description
    res.send({ success: true })
  } else {
    res.status(404).send({ error: 'Post not found' })
  }
})

// Delete a post
router.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p._id == req.params.id)
  if (index !== -1) {
    posts.splice(index, 1)
    res.send({ success: true, message: 'Post deleted successfully!' })
  } else {
    res.status(404).send({ error: 'Post not found' })
  }
})

module.exports = router;
