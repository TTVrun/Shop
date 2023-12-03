const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const User = require('../models/user')
const Notification = require('../models/notification')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const { name, username, password, email } = req.body
        //check data
        if (!name || !username || !password || !email) {
            throw new Error('Missing data to create account')
        }
        //check user already exitst
        const alreadyUsername = await User.findOne({ username })
        const alreadyEmail = await User.findOne({ email })
        if (alreadyUsername) {
            return res.json({
                success: false,
                mes: 'Username already exists'
            })
        }
        if (alreadyEmail) {
            return res.json({
                success: false,
                mes: 'Email already exists'
            })
        }
        //create user
        const user = await User.create(req.body)
        return res.status(200).json({
            success: user ? true : false,
            mes: user ? 'Register is successfully' : 'Something wrong'
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        //check data
        if (!username) {
            throw new Error('Missing username to login')
        }
        if (!password) {
            throw new Error('Missing password to login')
        }
        // check user, password, token and refresh token
        const user = await User.findOne({ username })
        //check user
        if (user) {
            //check password and generate token and refresh token
            if (await user.isCorrectPassword(password)) {
                // create token and refresh token
                const token = generateAccessToken(user._id, user.role)
                const refreshToken = generateRefreshToken(user._id)
                //save refresh token in cookie
                await res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
                //save refresh token to database
                await User.findOneAndUpdate({ username }, { refreshToken }, { new: true }).select('-password -role')
                //updata notification
                await User.findByIdAndUpdate(user._id, { $inc: { countNewNotification: 1 } })
                const notification = await Notification.findOne({ key: 'signinSuccess' })
                await User.findByIdAndUpdate(
                    user._id,
                    { $push: { notification: { $each: [notification._id], $position: 0 } } },
                    { new: true }
                )

                return res.json({
                    success: true,
                    mes: 'Login is successfully',
                    token
                })
            } else {
                return res.json({
                    success: false,
                    mes: 'Passwrod is wrong'
                })
            }
        } else {
            return res.json({
                success: false,
                mes: 'User does not exits'
            })
        }
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Xóa refresh token ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
}

const forgetpassword = async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            throw new Error('Missing input')
        }
        const alreadyUser = await User.findOne({ username })
        if (alreadyUser) {
            const updataUser = await User.findOneAndUpdate({ username }, { password }, { new: true })
            return res.json({
                success: updataUser ? true : false,
                mes: 'Password changed successfully'
            })
        } else {
            return res.json({
                success: false,
                mes: 'User does not exits'
            })
        }
    } catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            throw new Error('Missing input')
        }
        // Verify refresh token and check refresh token in db
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET)
        console.log(decodedRefreshToken)
        const response = await User.findOne({ refreshToken, _id: decodedRefreshToken._id })
        return res.json({
            success: response ? true : false,
            token: response ? generateAccessToken(response._id, response.role) : 'Refresh token is fail'
        })
    } catch (error) {
        next(error)
    }
}

const getCurrent = async (req, res, next) => {
    try {
        const user = req.user
        const UserCurrent = await User.findById(user._id)
            .select('-password -role -refreshToken -updatedAt -createdAt -username')
            .populate({
                path: 'notification',
                select: '-__v -key'
            })

        //
        return res.json({
            success: UserCurrent ? true : false,
            data: UserCurrent ? UserCurrent : 'Can not find current'
        })
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const { uid } = req.params
        const user = await User.findById(uid).select('-password -role')
        return res.json({
            success: user ? true : false,
            mes: user ? user : 'Can not find user'
        })
    } catch (error) {
        next(error)
    }
}

const uploadImage = async (req, res, next) => {
    try {
        const response = await User.findOneAndUpdate({ _id: req.user._id }, { avatar: req.file.path })
        return res.json({
            success: response ? true : false,
            mes: response ? 'Update image successfully' : "Can't update image",
            link: req.file.path
        })
    } catch (error) {
        next(error)
    }
}

const resetCountNotification = async (req, res, next) => {
    try {
        const { _id } = req.user
        const updated = await User.findByIdAndUpdate(_id, { countNewNotification: 0 })

        return res.json({
            success: updated ? true : false,
            mes: updated ? 'Successfully' : 'Wrong'
        })
    } catch (error) {
        next(error)
    }
}

const updateBasicInfo = async (req, res, next) => {
    try {
        const { _id } = req.user
        const { name, email, phone } = req.body

        if (!name | !email | !phone) {
            return res.json({
                success: false,
                mes: 'Missing input'
            })
        }
        const alreadyEmail = await User.findOne({ email, _id: { $ne: _id } })
        console.log(alreadyEmail)
        if (alreadyEmail) {
            return res.json({
                success: false,
                mes: 'Email already exists'
            })
        }
        const response = await User.findByIdAndUpdate(_id, { name, email, phone }, { new: true })
        const notification = await Notification.findOne({ key: 'updateSuccess' })
        await User.findByIdAndUpdate(_id, { $inc: { countNewNotification: 1 } })
        await User.findByIdAndUpdate(
            _id,
            { $push: { notification: { $each: [notification._id], $position: 0 } } },
            { new: true }
        )

        return res.json({
            success: response ? true : false,
            mes: 'Update is successfully'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login,
    getCurrent,
    getUser,
    forgetpassword,
    refreshToken,
    uploadImage,
    logout,
    resetCountNotification,
    updateBasicInfo
}
