const router = require('express').Router()
const ctrls = require('../controllers/district')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.get('/insert', verifyAccessToken, ctrls.insertDistrict)
router.get('/', verifyAccessToken, ctrls.getDistrictByProvince)

module.exports = router
