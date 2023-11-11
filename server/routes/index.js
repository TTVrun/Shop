const userRouter = require('./users')
const productRouter = require('./products')
const commentRouter = require('./comment')
const notificationRouter = require('./notification')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/comment', commentRouter)
    app.use('/api/notification', notificationRouter)

    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes
