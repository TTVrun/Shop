const Location = require('../models/location')
const User = require('../models/user')
const { ObjectId } = require('mongodb')

const createLocation = async (req, res, next) => {
    const { _id } = req.user
    const { province, district, commune, extrainfo } = req.body

    if (!province || !district || !commune || !extrainfo) {
        return res.json({
            success: false,
            mes: 'Missing data',
            address: null
        })
    }

    const newLocation = await Location.create(req.body)

    if (!newLocation) {
        return res.json({
            success: false,
            mes: 'Something is wrong',
            address: null
        })
    }
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            $push: { address: { $each: [newLocation._id], $position: 0 } }
        },
        { new: true }
    )

    return res.json({
        success: updatedUser ? true : false,
        mes: updatedUser ? 'Add address is successfully' : 'Wrong',
        address: newLocation
    })
}

const deleteAddress = async (req, res, next) => {
    try {
        const { _id } = req.user
        const { aid } = req.params

        await User.findByIdAndUpdate(_id, { $pull: { address: aid } })
        const deletedAddress = await Location.findByIdAndDelete(aid)

        return res.json({
            success: deletedAddress ? true : false,
            mes: 'Deleted'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createLocation,
    deleteAddress
}
