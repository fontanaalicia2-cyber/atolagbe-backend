const router = require('express').Router()
const Post = require('../models/Post')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  const posts = await Post.find({ published: true }).sort({ createdAt: -1 })
  res.json(posts)
})

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
  if (!post) return res.status(404).json({ message: 'Post not found' })
  res.json(post)
})

router.post('/', auth, async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user.id })
    res.status(201).json(post)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(post)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.json({ message: 'Post deleted' })
})

module.exports = router