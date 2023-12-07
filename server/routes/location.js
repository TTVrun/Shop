const router = require('express').Router()
const ctrls = require('../controllers/location')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, ctrls.createLocation)
router.delete('/:aid', verifyAccessToken, ctrls.deleteAddress)

module.exports = router
