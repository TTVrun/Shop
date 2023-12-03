const userRouter = require('./users')
const productRouter = require('./products')
const commentRouter = require('./comment')
const notificationRouter = require('./notification')
const provinceRouter = require('./province')
const districtRouter = require('./district')
const communeRouter = require('./commune')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/comment', commentRouter)
    app.use('/api/notification', notificationRouter)
    app.use('/api/province', provinceRouter)
    app.use('/api/district', districtRouter)
    app.use('/api/commune', communeRouter)

    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes
