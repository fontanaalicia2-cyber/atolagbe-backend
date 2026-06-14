const router = require('express').Router()
const nodemailer = require('nodemailer')

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    })
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Message:</strong> ${message}</p>`
    })
    res.json({ message: 'Message sent successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message' })
  }
})

module.exports = router