const app = require('express')
const router = app.Router()

router.get('/test', (req, res) => {
    res.json({ message: 'Test route' })
})