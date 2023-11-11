const router = require('express').Router()
const ctrls = require('../controllers/notification')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin], uploader.single('image'), ctrls.createNotification)

module.exports = router
