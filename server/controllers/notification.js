const Notification = require('../models/notification')

const createNotification = async (req, res, next) => {
    try {
        const { key, title, subtitle } = req.body
        const image = req.file
        if (!key || !title || !subtitle) {
            throw new Error('Missing data to create notification')
        }
        if (image) {
            req.body.image = image.path
        }
        const newNotification = await Notification.create(req.body)
        return res.json({
            success: newNotification ? true : false,
            mes: 'Create notification is successfully'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNotification
}
