const router = require('express').Router()
const ctrls = require('../controllers/users')
const { verifyAccessToken } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/signup', ctrls.register)
router.post('/signin', ctrls.login)
router.post('/forgetpassword', ctrls.forgetpassword)
router.put('/uploadimage', verifyAccessToken, uploader.single('image'), ctrls.uploadImage)
router.get('/getcurrent', verifyAccessToken, ctrls.getCurrent)
router.get('/resetcount', verifyAccessToken, ctrls.resetCountNotification)
router.get('/refreshtoken', ctrls.refreshToken)
router.get('/logout', ctrls.logout)
router.get('/getuser/:uid', verifyAccessToken, ctrls.getUser)

module.exports = router
