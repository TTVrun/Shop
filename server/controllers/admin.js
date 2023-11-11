const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.json({
            success: users ? true : false,
            mes: users ? users : 'Can not find users'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers
}
