
import express from 'express'

let router = express.Router()

router.get('/', (req, res) => {

    let options = {
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
      }

    res.sendFile('upload.html', options, (err) => {
        if (err) {
            console.log('err: ', err)
            res.status(err.status).end()
        } else {
            // console.log('send file ok.')
        }
    })
})

module.exports = router