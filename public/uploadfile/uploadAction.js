
import fs from 'fs'
import path from 'path'
import express from 'express'
import multer from 'multer'
import fileMd5 from './fileMd5'
import bundlesList from './bundlesInfo'

var AdmZip = require('adm-zip'); 

import unzip from 'unzip'

let bundleInfo = { 
    "zipPath": "", 
    "version": "", 
    "moduleName": "",
    "zipHash": "",
    "jsbundleHash": ""
}


let router = express.Router()

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('1--------------')
        cb(null, path.join(__dirname, '../files'))
        bundlesList.push(path.join(__dirname, '../files', file.originalname))
    },
    filename: (req, file, cb) => {
        console.log('2--------------')
        cb(null, file.originalname)
    }
})
let upload = multer({storage: storage})

router.post('/', upload.array('avatar'), (req, res, next) => {
    console.log('3--------------')

    bundlesList.map((value, index, arrs) => {

        fileMd5(value, (md5str) => {
            bundleInfo.zipHash = md5str
            bundleInfo.moduleName = value
        })

        const unzipFolder = path.basename(value, '.zip')
        const unzipPath = path.join(path.dirname(value), unzipFolder)

        var zip = new AdmZip(value); 
        zip.extractAllTo( unzipPath);

    })

    res.send('文件上传成功')
})

module.exports = router