
import express from 'express'

let router = express.Router()

router.get('/:user', (req, res) => {

    console.log('path:', req.params)
    console.log('query: ', req.query)
    console.log('body:', req.body)
    console.log('router:', req.route)
    res.send('article page.')
})

module.exports = router