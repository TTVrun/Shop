const jwt = require('jsonwebtoken')

const verifyAccessToken = async (req, res, next) => {
    try {
        if (req?.headers?.authorization?.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        mes: 'Invalid access token'
                    })
                } else {
                    req.user = decode
                    next()
                }
            })
        } else {
            return res.status(401).json({
                success: false,
                mes: 'Require authorization'
            })
        }
    } catch (error) {
        next(error)
    }
}

const isAdmin = (req, res, next) => {
    try {
        const { role } = req.user
        if (role !== 'admin')
            return res.status(401).json({
                success: false,
                mes: ' REQUIRE ADMIN ROLE'
            })
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    verifyAccessToken,
    isAdmin
}
