const router = require('express').Router()
const ctrls = require('../controllers/province')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.get('/insert', verifyAccessToken, ctrls.insertProvince)
router.get('/', verifyAccessToken, ctrls.getProvince)

module.exports = router
