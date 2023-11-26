const router = require('express').Router()
const ctrls = require('../controllers/products')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/create', [verifyAccessToken, isAdmin], ctrls.createProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.put('/', [verifyAccessToken, isAdmin], uploader.array('images', 10), ctrls.updateProduct)
router.get('/getproducts', [verifyAccessToken, isAdmin], ctrls.getProducts)
router.get('/delete', ctrls.deleteProductByCategory)
router.get('/delete', ctrls.deleteProductByCategory)
router.get('/insert', ctrls.insert)
router.get('/related/:category/:pid', ctrls.relatedProducts)
router.get('/getproductsbycategory/:category', ctrls.getProductsByCategory)
router.get('/:pid', ctrls.getProduct)

module.exports = router
