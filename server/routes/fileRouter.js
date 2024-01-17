const router = require('express').Router()
const multer  = require('multer')
const files = require('../controllers/files')

const upload = multer({
    limits: { fileSize: 50000000 }
})

router.get('/getall', files.getAll)

router.post('/add',upload.single('file'), files.add)

router.delete('/delete/:id', files.delete)

module.exports = router