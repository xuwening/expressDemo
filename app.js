'use strict'

import express from 'express'
let app = express()

//静态资源访问
app.use('/static', express.static('public'))

//get post
app.get('/', (req, res) => (res.send('Hello world.'), next()), (req, res) => res.send('papap'))
app.post('/', (req, res) => res.send('get a POST request.'))

//json数据
app.get('/user', (req, res) => res.json({name: 'he', age:17}))

//下载文件
app.get('/download', (req, res) => res.download('./public/111.zip'))

//http header
app.get('message', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.set({
        'Content-Length': 'Hello world.'.length,
        'Etag': '123123'
    })
})

app.all('/*', (req, res) => {
    res.status(404).send('not found page.')
    // res.send('not found page.')
})

//字符匹配
// app.get('/ab?cd', (req, res) => console.log(''))
// app.get('/ab+cd', (req, res) => console.log(''))
// app.get('/ab*cd', (req, res) => console.log(''))

//正则匹配
app.get(/.*fly$/, (req, res) => console.log(''))

var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('start server %s, port %s', host, port)
})

//中间件
//应用级中间件：app.use()、app.get()
//没有挂载路径，每个路径都会执行
app.use((req, res, next) => res.send('process each path'))