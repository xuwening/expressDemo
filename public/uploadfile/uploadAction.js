
import path from 'path'
import express from 'express'
import multer from 'multer'

let router = express.Router()

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('1--------------')
        cb(null, path.join(__dirname, '../files'))
    },
    filename: (req, file, cb) => {
        console.log('2--------------')
        cb(null, file.originalname)
    }
})
let upload = multer({storage: storage})

router.post('/', upload.single('avatar'), (req, res, next) => {
    console.log('3--------------')
    res.send('文件上传成功')
})

module.exports = router