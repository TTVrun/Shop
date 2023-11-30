const router = require('express').Router()
const ctrls = require('../controllers/comment')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
// const uploader = require('../config/cloudinary.config')

router.post('/:pid', verifyAccessToken, ctrls.commentProduct)
router.post('/replycomment/:cid', verifyAccessToken, ctrls.replyComment)
router.get('/:commentId', ctrls.getComment)

module.exports = router
