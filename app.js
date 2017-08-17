'use strict'

import express from 'express'

let app = express()

app.get('/', (req, res) => res.send('Hello world.'))
app.post('/', (req, res) => res.send('get a POST request.'))

var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('start server %s, port %s', host, port)
})