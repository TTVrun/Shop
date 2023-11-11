const router = require('express').Router()
const ctrls = require('../controllers/products')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/create', [verifyAccessToken, isAdmin], ctrls.createProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.put('/', [verifyAccessToken, isAdmin], uploader.array('images', 10), ctrls.updateProduct)
router.get('/getproducts', [verifyAccessToken, isAdmin], ctrls.getProducts)
router.get('/:pid', verifyAccessToken, ctrls.getProduct)

module.exports = router
