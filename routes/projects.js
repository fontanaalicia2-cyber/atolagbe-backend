const router = require('express').Router()
const Project = require('../models/Project')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 })
  res.json(projects)
})

router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(project)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.json({ message: 'Project deleted' })
})

module.exports = router