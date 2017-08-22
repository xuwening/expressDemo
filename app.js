'use strict'

import express from 'express'
import compression from 'compression'
import article from './app/article'

let app = express()

//response添加gzip压缩
app.use(compression())

//多路由控制
app.use('/article', article)

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
    res.setHeader('Content-Type', 'application/json')
    res.setHeader({
        'Content-Length': 'Hello world.'.length,
        'Etag': '123123'
    })
})

app.all('/biz-orange/RN/patchVersion', (req, res) => {

    let resBody = {

        resBody: {

            patchs:[   
                { 
                    "zipPath": "http://192.168.6.30:3000/static/LDBusinessEntry.zip", 
                    "version": "1.0.3", 
                    "moduleName": "LDBusinessEntry",
                    "zipHash": "569ba6a44b85a333f675712fc7be57b2",
                    "jsbundleHash": "46df2e326f0c61ed490d938bfff0e118",
                },
                { 
                    "zipPath": "http://192.168.6.30:3000/static/LDCommon.zip", 
                    "version": "1.0.1", 
                    "moduleName": "LDCommon",
                    "zipHash": "569ba6a44b85a333f675712fc7be57b2",
                    "jsbundleHash": "46df2e326f0c61ed490d938bfff0e118",
                },
            ]
        }
    }

    res.json(resBody)
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
app.use('/user/:id', (req, res, next) => res.send('process...'))

//路由中间件：和应用级中间件一样
var router = express.Router()
router.use((req, res, next) =>res.send('process each path'))
router.use('/user/:id', (req, res, next) => res.send('process...'))
app.use('/', router)  //将路由中间件挂载到app

//错误处理中间件
app.use((err, req, res, next) => res.status(500).send('something broke.'))

//静态资源托管中间件
// app.use(express.static('public', options))
