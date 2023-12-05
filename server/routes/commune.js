const router = require('express').Router()
const ctrls = require('../controllers/commune')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.get('/insert', verifyAccessToken, ctrls.insertCommune)
router.get('/:province/:district', verifyAccessToken, ctrls.getDistrictByProvinceAndDistrict)

module.exports = router
